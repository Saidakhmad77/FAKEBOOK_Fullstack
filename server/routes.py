from app import app, db, bcrypt
from flask import jsonify, request
from models import User
from flask_jwt_extended import (
    create_access_token,
    unset_jwt_cookies,
    jwt_required,
    unset_access_cookies,
)

@app.route("/token", methods=["POST"])
def create_token():
    data = request.get_json()
    
    user = User.query.filter_by(username=data.get("username")).first()
    
    if user is None:
        return jsonify({"error": "Invalid username"}), 401
    if not bcrypt.check_password_hash(user.password, data.get("password")):
        return jsonify({"error": "Invalid password"}), 401
    
    access_token = create_access_token(identity=user.user_id)
    
    return jsonify({"access_token":  access_token}), 200


@app.route("/profile", methods=["GET"])
def get_profile():
    pass



@app.route("/", methods=["GET"])
def hello_world():
    return "Hello world!"


@app.route("/login", methods=["POST"])
def login_user():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    user = User.query.filter_by(username=username).first()

    if not user:
        return jsonify({"error": "Invalid username or password"}), 401

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Invalid username or password"}), 401

    return jsonify({"message": "Successful login", "user": user.to_json()}), 200


@app.route("/register", methods=["POST"])
def register_user():
    data = request.get_json()
    
    user_exists = (
        User.query.filter_by(username=data.get("username")).first() is not None
    )
    
    if user_exists:
        return jsonify({"Failed to create account": "Username already exists"}), 409
    
    username = data.get("username")
    password = data.get("password")
    bio = data.get("bio")
    
    hashed_password = bcrypt.generate_password_hash(password)
    
    new_user = User(username=username, password=hashed_password, bio=bio)
    
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify(new_user.to_json()), 201



@app.route("/logout", methods=["POST"])
def logout_user():
    response = jsonify({"message": "Logout successful"})
    unset_jwt_cookies(response)
    
    return response, 200