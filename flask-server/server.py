import random
from urllib import request
from flask import Flask, request, jsonify, json
import requests
from bs4 import BeautifulSoup


app = Flask(__name__)


def getMovies(users):
    movies = {}
    for user in users:
        movies.update({user: []})
        URL = 'https://letterboxd.com/{user}/watchlist/'.format(user=user)
        page = requests.get(URL)
        soup = BeautifulSoup(page.content, "html.parser")
        while soup.find('a', {"class": "next"}):
            films = soup.find_all(
                "div", {"class": "film-poster"})
            for film in films:
                movies.get(user).append(film.find('img')['alt'])
            URL = 'https://letterboxd.com' + soup.find(
                'a', {"class": "next"})['href']
            page = requests.get(URL)
            soup = BeautifulSoup(page.content, "html.parser")
    return movies


def getCommon(movies):
    common = list(set.intersection(*map(set, movies.values())))
    return (common)


def getRandom(movies):
    return random.choice(movies)


def getMovieInfo(movie):

    URL = 'https://www.omdbapi.com/?t={movie}&apikey=ee7ec867'.format(
        movie=movie.replace(' ', '+'))
    page = requests.get(URL)

    return page.json()


@app.route('/api/search', methods=['POST'])
def search():
    request_data = json.loads(request.data)['content']
    users = request_data.split(',')
    list = getMovies(users)
    common = getCommon(list)
    random = getRandom(common)
    movie = getMovieInfo(random)
    return movie


if __name__ == '__main__':
    app.run(debug=True)
