from textblob import TextBlob
import sys


def main():
    text = sys.argv[1:]
    for x in range(len(text)):
        text[x] = str(text[x])
    newtext = " ".join(str(x) for x in text)

    analysis = TextBlob(newtext).sentiment
    print(analysis[0])


if __name__ == '__main__':
    main()
