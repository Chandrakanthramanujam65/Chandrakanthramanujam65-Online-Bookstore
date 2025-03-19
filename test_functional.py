from selenium import webdriver
import pytest

@pytest.fixture
def browser():
    driver = webdriver.Chrome()  # Ensure ChromeDriver is installed
    yield driver
    driver.quit()

def test_homepage(browser):
    browser.get("http://localhost:5000")
    assert "Welcome to the Online Bookstore!" in browser.page_source