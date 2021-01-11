import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify
from sqlalchemy import create_engine

from flask import Response,json

from flask import Flask, jsonify

from flask import Flask, render_template

import pandas as pd

import psycopg2

from sqlalchemy import create_engine

#################################################
# Database Setup
#################################################
#engine = create_engine("postgresql://postgres:admin@localhost:5432/postgres")

# reflect an existing database into a new model
#Base = automap_base()
# reflect the tables
#Base.prepare(engine, reflect=True)

# Save reference to the table
conn = psycopg2.connect(host="ec2-18-235-107-171.compute-1.amazonaws.com", port = 5432, database="d7jh5dkda0c4j3", user="bynriruplsdsdx", password = "456abe0bdccb91f64c86884bc754ede216d9b86a4700d3a24782c08adf7f872f")

results = pd.read_sql("SELECT * FROM traffic", conn)

results = results.rename(columns={"NM_REGION\t": "NM_REGION"})

results = results.to_json(orient="records")
#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/test", methods=["GET"])
def welcome():
    """List all available api routes."""
    parsed = json.loads(results)

    return (jsonify(parsed))


if __name__ == '__main__':
    app.run(debug=True)
