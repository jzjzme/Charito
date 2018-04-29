import sys
import psycopg2
import urllib
import requests
import json
import re
import time
import xmltodict
import csv
from urllib.request import urlopen
import unittest
import urllib
import csv
from urllib.request import urlopen
from urllib.error import URLError, HTTPError
from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException        

def check(xpath):
    try:
        driver.find_element_by_xpath(xpath)
    except NoSuchElementException:
        return False
    return True

def css(css):
    try:
        driver.find_element_by_css_selector(css)
    except NoSuchElementException:
        return False
    return True

def tags(tagname):
    try:
        driver.find_element_by_tag_name('h5')
    except NoSuchElementException:
        return False
    return True

def search(word):
    try:
        driver.find_element_by_link_text('%s'%word)
    except NoSuchElementException:
        return False
    return True



file = csv.writer(open('charity_info.csv', 'w'))

file.writerow(['Name', 'Lat', 'Long','City', 'charity'])

driver = webdriver.Chrome()

idlist = #GPS LOCATION FROM PC

for x in idlist:
    driver.get("https://www.drought.gov/drought/%s" %x)
    misc = ''

    Name= driver.find_element_by_xpath('//*[@id="drought"]/section/div[2]/div/div[1]/div[1]/h1').text
    #Split subtitle text using comma delimiters
    subtitle= driver.find_element_by_xpath('//*[@id="drought"]/section/div[2]/div/div[1]/div[1]/p').text
    subtitle= subtitle.split(",") 
    #City
    City= subtitle[0]
    #Region
    Region= subtitle[1]
    #Country
    Country=subtitle[2]
    #Area
    Area=subtitle[3]

    #Lat

    lat = driver.find_element_by_xpath("/html/head/meta[17]")
    lat = lat.get_attribute("content")

    #Long
    lon = driver.find_element_by_xpath("/html/head/meta[18]")
    lon = lon.get_attribute("content")
    body = driver.find_element_by_tag_name('body').text
    body = str(body)
    file.writerow(['%s'%Name, '%s'%lat, '%s'%lon, '%s'%City,'%s'%Region,'%s'%Country,'%s'%Area])

    time.sleep(10)






