import pandas as pd

# Load the scraped data
df = pd.read_csv("books.csv")

print("=" * 50)
print("BOOK DATA ANALYSIS")
print("=" * 50)

# 1. Total books
print(f"\nTotal books: {len(df)}")

# 2. Average price
print(f"Average price: £{df['price'].mean():.2f}")

# 3. Most expensive book
most_expensive = df.loc[df["price"].idxmax()]

print("\nMost expensive book:")
print(f"Title: {most_expensive['title']}")
print(f"Price: £{most_expensive['price']:.2f}")

# 4. Cheapest book
cheapest = df.loc[df["price"].idxmin()]

print("\nCheapest book:")
print(f"Title: {cheapest['title']}")
print(f"Price: £{cheapest['price']:.2f}")

# 5. Average price by rating
print("\nAverage price by rating:")

average_by_rating = df.groupby("rating")["price"].mean()

print(average_by_rating)

# 6. Books by rating
print("\nBooks by rating:")

rating_counts = df["rating"].value_counts().sort_index()

print(rating_counts)

# 7. Books by category
print("\nBooks by category:")

category_counts = df["category"].value_counts()

print(category_counts)

# 8. Most expensive books
print("\nTop 10 most expensive books:")

top_expensive = df.nlargest(10, "price")

print(
    top_expensive[
        ["title", "price", "rating", "category"]
    ].to_string(index=False)
)

# 9. Highest rated books
print("\n5-star books:")

five_star_books = df[df["rating"] == 5]

print(
    five_star_books[
        ["title", "price", "category"]
    ].to_string(index=False)
)

print("\n" + "=" * 50)
print("ANALYSIS COMPLETE")
print("=" * 50)