
# A very simple Flask Hello World app for you to get started with...

#from flask import Flask
from flask import *
from flask_cors import CORS, cross_origin

from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer
from chatterbot.trainers import ChatterBotCorpusTrainer
my_bot = ChatBot(name='PyBot', read_only=True,logic_adapters=['chatterbot.logic.MathematicalEvaluation','chatterbot.logic.BestMatch'])
small_talk = ['hi there!',
          'hi!',
          'how do you do?',
          'how are you?',
          'i\'m cool.',
          'fine, you?',
          'always cool.',
          'i\'m ok',
          'glad to hear that.',
          'i\'m fine',
          'glad to hear that.',
          'i feel awesome',
          'excellent, glad to hear that.',
          'not so good',
          'sorry to hear that.',
          'what\'s your name?',
          'i\'m pybot. ask me a math question, please.']
math_talk_1 = ['pythagorean theorem',
           'a squared plus b squared equals c squared.']
math_talk_2 = ['law of cosines',
           'c**2 = a**2 + b**2 - 2 * a * b * cos(gamma)']
list_trainer = ListTrainer(my_bot)
for item in (small_talk, math_talk_1, math_talk_2):
    list_trainer.train(item)

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    return 'Hello from Flask!'


@app.route('/message',methods=['GET', 'POST'])
def message():
    x=chatbot(request.form['text'])
    return str(x)

def chatbot(text):
    global my_bot
    #corpus_trainer = ChatterBotCorpusTrainer(my_bot)
    #corpus_trainer.train('chatterbot.corpus.english')

    return my_bot.get_response(text)
