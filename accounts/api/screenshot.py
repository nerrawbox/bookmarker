from selenium import webdriver
import base64
from urllib.parse import urlparse
import cloudinary
from cloudinary import uploader
import re
import os


def get_screenshot(url):
    try:
        regex = re.compile(
            r'^(?:http|ftp)s?://'  # http:// or https://
            # domain...
            r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|'
            r'localhost|'  # localhost...
            r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})'  # ...or ip
            r'(?::\d+)?'  # optional port
            r'(?:/?|[/?]\S+)$', re.IGNORECASE)

        if re.match(regex, url) is not None:
            isUrl = url
        else:
            isUrl = 'http://' + url

        #GOOGLE_CHROME_PATH = '/app/.apt/usr/bin/google_chrome'
        CHROMEDRIVER_PATH = '/app/.chromedriver/bin/chromedriver'

        chrome_bin = os.environ.get('GOOGLE_CHROME_BIN', "chromedriver")

        options = webdriver.ChromeOptions()
        options.binary_location = chrome_bin
        options.add_argument('—-no-sandbox')
        options.add_argument('--disable-setuid-sandbox')
        options.add_argument('—-headless')
        options.add_argument('--disable-dev-shm-usage')
        options.add_argument('--disable-infobars')
        options.add_argument('--disable-extensions')
        options.add_argument('--remote-debugging-port=9222')
        options.add_argument('—-disable-gpu')
        options.add_argument('window-size=1200x600')

        #DRIVER = 'chromedriver'
        #driver = webdriver.Chrome(DRIVER)
        driver = webdriver.Chrome(
            executable_path=CHROMEDRIVER_PATH, chrome_options=options)
        driver.get(isUrl)
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
