# api.py
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

# تهيئة التطبيق وقاعدة البيانات
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///drivers.db'
db = SQLAlchemy(app)

# --- نماذج قاعدة البيانات (SQLAlchemy) ---
class Driver(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)

class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    driver_id = db.Column(db.Integer, db.ForeignKey('driver.id'), nullable=False)
    month = db.Column(db.String(10), nullable=False) 
    customer = db.Column(db.String(80), nullable=False)

# تهيئة الجداول في قاعدة البيانات عند التشغيل
with app.app_context():
    db.create_all()

# --- مسارات API (Flask) ---

# إضافة سائق
@app.route('/api/drivers', methods=['POST'])
def add_driver():
    data = request.get_json()
    new_driver = Driver(name=data['name'])
    db.session.add(new_driver)
    db.session.commit()
    return jsonify({"message": f"Driver {data['name']} added with ID {new_driver.id}"}), 201
# --- مسار لعرض حالة السائقين والحجوزات ---
@app.route('/api/drivers_status', methods=['GET'])
def get_drivers_status():
    # استرجاع جميع السائقين
    drivers = Driver.query.all()
    status_list = []
    
    for driver in drivers:
        # استرجاع جميع حجوزات هذا السائق
        bookings = Booking.query.filter_by(driver_id=driver.id).all()
        booking_months = [
            {'month': b.month, 'customer': b.customer} 
            for b in bookings
        ]
        
        status_list.append({
            'driver_id': driver.id,
            'name': driver.name,
            'status': 'Booked' if bookings else 'Available',
            'bookings_details': booking_months
        })
        
    return jsonify(status_list)
# حجز سائق
@app.route('/api/book', methods=['POST'])
def book_driver():
    data = request.get_json()

    # 1. التحقق من وجود السائق
    driver = Driver.query.get(data['driver_id'])
    if not driver:
        return jsonify({"error": "Driver not found"}), 404

    # 2. التحقق من عدم التوفر في الشهر المحدد
    existing_booking = Booking.query.filter_by(
        driver_id=data['driver_id'], 
        month=data['month']
    ).first()

    if existing_booking:
        return jsonify({"error": f"Driver is already booked for {data['month']}"}), 409

    # 3. تسجيل الحجز
    new_booking = Booking(
        driver_id=data['driver_id'], 
        month=data['month'], 
        customer=data['customer_name']
    )
    db.session.add(new_booking)
    db.session.commit()

    return jsonify({"message": "Booking successful"}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
@app.route('/api/drivers_status', methods=['GET'])
def get_drivers_status():
    drivers = Driver.query.all()
    status_list = []

    for driver in drivers:
        bookings = Booking.query.filter_by(driver_id=driver.id).all()
        booking_months = [b.month for b in bookings]

        status_list.append({
            'driver_id': driver.id,
            'name': driver.name,
            'booked_months': booking_months
        })

    return jsonify(status_list)
#curl -X POST \
#  http://127.0.0.1:5000/api/book \
 # -H "Content-Type: application/json" \
  #-d '{"driver_id": 1, "month": "2026-06", "customer_name": "سعد"}'
