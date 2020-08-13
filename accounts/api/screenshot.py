from selenium import webdriver
import base64
import cloudinary
from cloudinary import uploader
import re
import requests


def get_screenshot_image(url):
    # Use this to process Screenshot form a different API
    return get_screenshot_from_api(url)
    # Use this to process Screenshot using this backend
    # Make sure you have chromedriver installed
    # return get_screenshot_from_backend(url)


def get_screenshot_from_api(url):
    try:
        formatted_url = test_url(url)
        mUrl = 'https://url-to-pdf-api-copy.herokuapp.com/api/render?output=screenshot&screenshot.fullPage=false&url=' + formatted_url
        screenshot_img = requests.get(mUrl)
        result = screenshot_img.content
        if result != '':
            result_cloudinary = cloudinary.uploader.upload(result)
            return result_cloudinary['secure_url']
        else:
            return ''
    except Exception as e:
        print(e)
        return ''


def get_screenshot_from_backend(url):
    try:
        formatted_url = test_url(url)
        DRIVER = 'chromedriver'
        driver = webdriver.Chrome(DRIVER)
        driver.get(formatted_url)
        screenshot_img = driver.get_screenshot_as_png()
        # screenshot = base64.encodestring(screenshot_img)
        driver.quit()
        if screenshot_img != '':
            result_cloudinary = cloudinary.uploader.upload(screenshot_img)
            return result_cloudinary['url']
        else:
            return ''
    except Exception as e:
        print(e)
        return ''


def test_url(url):
    regex = re.compile(
        r'^(?:http|ftp)s?://'  # http:// or https://
        # domain...
        r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|'
        r'localhost|'  # localhost...
        r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})'  # ...or ip
        r'(?::\d+)?'  # optional port
        r'(?:/?|[/?]\S+)$', re.IGNORECASE)

    if re.match(regex, url) is not None:
        return url
    else:
        return 'http://' + url
