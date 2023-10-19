from flask import Flask, request, render_template
from stories import Story, story

app = Flask(__name__)


@app.route('/')
def index():
    print(story.prompts)
    return render_template('home.html', story=story)


@app.route('/story', methods=["POST"])
def res():
    text = story.generate({prompt: request.form.get(prompt)
                          for prompt in story.prompts})
    print(text)
    return render_template('res.html', text=text)


if __name__ == "__main__":
    app.run(debug=True)
