from wortbuch import app

@app.route('/')
def about():
    return ('Hello, wortbuch!')
