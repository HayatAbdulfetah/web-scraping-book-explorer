import pandas as pd
import matplotlib.pyplot as plt

# Load the scraped data
df = pd.read_csv("books.csv")


# -----------------------------
# 1. Books by rating
# -----------------------------

rating_counts = df["rating"].value_counts().sort_index()

rating_counts.plot(
    kind="bar",
    title="Number of Books by Rating"
)

plt.xlabel("Rating")
plt.ylabel("Number of Books")
plt.tight_layout()
plt.show()


# -----------------------------
# 2. Top 10 categories
# -----------------------------

category_counts = df["category"].value_counts().head(10)

category_counts.plot(
    kind="bar",
    title="Top 10 Book Categories"
)

plt.xlabel("Category")
plt.ylabel("Number of Books")
plt.xticks(rotation=45, ha="right")
plt.tight_layout()
plt.show()


# -----------------------------
# 3. Price distribution
# -----------------------------

df["price"].plot(
    kind="hist",
    bins=20,
    title="Book Price Distribution"
)

plt.xlabel("Price (£)")
plt.ylabel("Number of Books")
plt.tight_layout()
plt.show()