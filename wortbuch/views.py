from flask import render_template, jsonify
from wortbuch import app
from lxml import html

# Catch-all view function for client-side rendering
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return render_template('main.html')


# Translation API using linguee.com
@app.route('/linguee/<origin>/<word>')
def translate(origin, word):
    url = 'http://www.linguee.com/german-english/search?source={}&query={}'.\
            format(origin, word)

    lemmas = get_lemmas_from_linguee(url)

    words = []
    for lemma in lemmas:
        word = parse_lemma(lemma)
        words.append(word)

    return jsonify(words=words)


def parse_lemma(lemma):
    word = {'translations': []}

    try:
        dict_term_elm = lemma.find_class('dictTerm')[0]
    except:
        pass

    word_type_elm = lemma.find_class('tag_wordtype')[0]
    trans_elms = lemma.find_class('tag_trans')

    word['dict_term'] = dict_term_elm.text
    word_type = word_type_elm.text.split(',\xa0')

    word['word_class'] = word_type[0]
    if len(word_type) > 1:
        word['gender'] = word_type[1]

    for trans_elm in trans_elms:
        trans_elm = list(trans_elm)

        translation = {}
        translation['meaning'] = trans_elm[0].text_content().split()[-1]
        translation['tag'] = trans_elm[1].text
        word['translations'].append(translation)

    return word

def get_lemmas_from_linguee(url):
    tree = html.parse(url)
    exact = tree.getroot().find_class('exact')[0]

    return exact.find_class('lemma')
