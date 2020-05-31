/**
 * http://usejsdoc.org/
 */

describe('Proto commerce- Shop', function() {
	var EC = protractor.ExpectedConditions;

	browser.get("https://qaclickacademy.github.io/protocommerce/");

	function fillForm(name, emailID, password, GenderID, empStatusID, bday) {

		element(by.name("name")).sendKeys(name);
		element(by.name("email")).sendKeys(emailID);
		element(by.css("input[type='password']")).sendKeys(password);

		element(by.id("exampleFormControlSelect1")).all(by.tagName("option"))
				.get(GenderID).click();

		element.all(by.className("form-group")).all(
				by.css("input[type='radio']")).get(empStatusID).click();

		browser.sleep(4000);
		element(by.name("bday")).sendKeys(bday);
		browser.sleep(4000);
		element(by.css("input[type='submit']")).click();
		browser.wait(EC.visibilityOf(element(by.tagName("strong"))), 4000);
		return element(by.css("div[class*='success']")).getText().then(
				function(text) {
					return text;

				})
	}
	function navigateToShopping() {

		element(by.css("a[href*='shop']")).click();

	}

	function addToCart(itemName) {
		// console.log('here1');

		element.all(by.tagName("app-card")).each(function(item) {

			item.element(by.css("h4 a")).getText().then(function(text) {

				if (text == itemName) {
					item.element(by.css("button[class*='btn-info']")).click();

				}
			})

		})

	}

	function checkCartCount() {
		return element(by.partialLinkText("Checkout")).getText().then(
				function(text) {
					var tempText = text;

					var x = tempText.split("(");
					var y = Number(x[1].trim().charAt(0));

					return y;
				});
	}

	function getPrice(itemCount) {
		element(by.partialLinkText("Checkout")).click();

		browser.wait(EC.visibilityOf(element(by.tagName("tbody"))), 4000);

		element(by.tagName('tbody')).all(by.tagName('tr')).each(
				function(item, index) {
					if (index >= itemCount) {

						return true;
					}

					item.all(by.tagName('td')).get(3).getText().then(
							function(text) {

								console.log(text);

							})

				});

	}

	it('test : Fill form for employed female and shop for 2 items', function() {

		/*
		 * fillForm("TestUser", "testuser@gmail.com", "123456", 1, 1,
		 * "01031990").then(function(text){
		 * 
		 * console.log(text); });
		 */
		// console.log(successMessage);
		navigateToShopping();
		browser.sleep(4000)
		addToCart("iphone X");
		addToCart("Samsung Note 8");
		checkCartCount().then(function(y) {
			expect(y).toBe(2);
		})
		getPrice(2);
	});

});
