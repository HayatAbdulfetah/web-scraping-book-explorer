import requests
import csv
from bs4 import BeautifulSoup
from urllib.parse import urljoin


BASE_URL = "https://books.toscrape.com/"

session = requests.Session()

books_data = []


def get_book_details(book_url):
    try:
        response = session.get(book_url, timeout=10)
        response.encoding = "utf-8"

        soup = BeautifulSoup(response.text, "html.parser")

        # Category
        breadcrumb_links = soup.select("ul.breadcrumb li a")

        if breadcrumb_links:
            category = breadcrumb_links[-1].get_text(strip=True)
        else:
            category = ""

        # Description
        description_section = soup.find(
            "div",
            id="product_description"
        )

        if description_section:
            description = (
                description_section
                .find_next_sibling("p")
                .get_text(strip=True)
            )
        else:
            description = ""

        # UPC
        product_info = soup.find(
            "table",
            class_="table-striped"
        )

        upc = ""

        if product_info:
            rows = product_info.find_all("tr")

            for row in rows:
                cells = row.find_all("td")

                if cells and cells[0].get_text(strip=True) == "UPC":
                    upc = cells[1].get_text(strip=True)
                    break

        return category, description, upc

    except requests.RequestException:
        print(f"Failed to scrape: {book_url}")
        return "", "", ""


url = BASE_URL

while url:
    print(f"\nScraping page: {url}")

    response = session.get(url, timeout=10)
    response.encoding = "utf-8"

    soup = BeautifulSoup(response.text, "html.parser")

    books = soup.find_all(
        "article",
        class_="product_pod"
    )

    for book in books:

        title = book.find(
            "h3"
        ).find(
            "a"
        ).text.strip()

        price = book.find(
            "p",
            class_="price_color"
        ).text.strip()

        price = price.replace("£", "")
        price = float(price)

        availability = book.find(
            "p",
            class_="instock"
        ).get_text(strip=True)

        rating = book.find(
            "p",
            class_="star-rating"
        )["class"][1]

        rating_values = {
            "One": 1,
            "Two": 2,
            "Three": 3,
            "Four": 4,
            "Five": 5
        }

        rating = rating_values[rating]

        book_link = book.find(
            "h3"
        ).find(
            "a"
        )["href"]

        book_url = urljoin(url, book_link)

        print(
            f"Book {len(books_data) + 1}/1000: {title}"
        )

        category, description, upc = get_book_details(
            book_url
        )

        books_data.append({
            "title": title,
            "price": price,
            "availability": availability,
            "rating": rating,
            "category": category,
            "description": description,
            "upc": upc,
            "url": book_url
        })

    next_button = soup.find(
        "li",
        class_="next"
    )

    if next_button:
        next_link = next_button.find("a")["href"]
        url = urljoin(url, next_link)
    else:
        url = None


with open(
    "books.csv",
    "w",
    newline="",
    encoding="utf-8"
) as file:

    writer = csv.DictWriter(
        file,
        fieldnames=[
            "title",
            "price",
            "availability",
            "rating",
            "category",
            "description",
            "upc",
            "url"
        ]
    )

    writer.writeheader()
    writer.writerows(books_data)


print(f"\nSaved {len(books_data)} books to books.csv")