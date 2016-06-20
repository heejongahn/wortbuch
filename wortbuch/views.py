from flask import render_template, jsonify, request
from wortbuch import app, db, lm
from wortbuch.models import User, Wordbook, Word
from lxml import html

from flask.ext.login import login_user, logout_user, current_user

# Catch-all view function for client-side rendering
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return render_template('main.html')


# Login
@lm.user_loader
def load_user(user_id):
    return User.query.get(user_id)

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()

    try:
        u = User(data.username, data.password)
        db.session.add(u)
        db.session.save()
        return 'okay'

    except:
        return 'not okay'

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    try:
        user = User.query.filter_by(username=data.username).first_or_404()
    except:
        return 'no such user'

    if user.is_correct_password(data.password):
        login_user(user)
        return 'ok'

    else:
        return 'wrong password'

@app.route('/logout')
def logout():
    logout_user()
    return 'ok'


# Translation API using linguee.com
@app.route('/linguee/<origin>/<word>')
def translate(origin, word):
    url = 'http://www.linguee.com/german-english/search?source={}&query={}'.\
            format(origin, word)

    lemmas = get_lemmas_from_linguee(url)

    results = []
    for lemma in lemmas:
        result = parse_lemma(lemma)
        results.append(result)

    return jsonify(results=results)


def parse_lemma(lemma):
    result = {'translations': []}

    try:
        dict_term_elm = lemma.find_class('dictTerm')[0]
        result['dict_term'] = dict_term_elm.text
    except:
        return {}

    word_type_elm = lemma.find_class('tag_wordtype')[0]
    word_type = word_type_elm.text.split(',\xa0')
    result['word_class'] = word_type[0]

    trans_elms = lemma.find_class('tag_trans')
    for trans_elm in trans_elms:
        trans_elm = list(trans_elm)

        translation = {}
        translation['meaning'] = trans_elm[0].text_content().split()[-1]
        translation['tag'] = trans_elm[1].text
        result['translations'].append(translation)

    return result

def get_lemmas_from_linguee(url):
    tree = html.parse(url)
    exact = tree.getroot().find_class('exact')

    if exact:
        return exact[0].find_class('lemma')

    else:
        return []
