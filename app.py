from flask import Flask, render_template, request, redirect, url_for, flash
import mysql.connector
import os

app = Flask(__name__)
app.secret_key = "your_secret_key"  # needed for flash messages

# MySQL connection

db = mysql.connector.connect(
    host=os.environ.get("MYSQLHOST"),
    port=int(os.environ.get("MYSQLPORT")),
    user=os.environ.get("MYSQLUSER"),
    password=os.environ.get("MYSQLPASSWORD"),
    database=os.environ.get("MYSQLDATABASE")
)



# db = mysql.connector.connect(
#     host="localhost",
#     port=3306,
#     user="root",
#     password="Gupta@123",
#     database="happy_scoops"
# )


cursor = db.cursor()

# Routes
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/menu")
def menu():
    return render_template("menu.html")

@app.route("/contact", methods=["GET", "POST"])
def contact():
    if request.method == "POST":
        name = request.form["name"]
        email = request.form["email"]
        mobile = request.form["mobile_number"]
        address = request.form["address"]
        orders = request.form["orders"]

        # Insert into DB
        cursor.execute(
            "INSERT INTO contact_messages (name, email, mobile, address ,orders) VALUES (%s, %s, %s, %s, %s)",
            (name, email, mobile, address ,orders)
        )
        db.commit()

        app.secret_key = 'your_secret_key'
        flash(" Order Placed Sucessfully! We will contact you soon 😊", "success")
        return redirect(url_for("contact"))

    return render_template("contact.html")



if __name__ == "__main__":
    app.run(debug=True)
