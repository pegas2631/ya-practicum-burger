describe('Burger constructor', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000');
		cy.intercept("POST", "api/orders", { fixture: "order.json" }).as("postOrder");

		window.localStorage.setItem(
			"refreshToken",
			JSON.stringify("test-refreshToken")
		);

		window.localStorage.setItem(
			'accessToken',
			JSON.stringify('test-accessToken')
		)
	});

	it('should drag and drop ingredients', () => {
		cy.get('.ingredient-card-test-class').first().as('ingredient1');
		cy.get('.ingredient-card-test-class').eq(2).as('ingredient2');
		cy.get('[data-testId=burger-constructor]').as('burgerConstructor');

		cy.get('@ingredient1').find('[data-testId=ingredient-name]').invoke('text').as('ingredientName1');
		cy.get('@ingredient2').find('[data-testId=ingredient-name]').invoke('text').as('ingredientName2');

		cy.get('@ingredient1').trigger('dragstart');
		cy.get('@burgerConstructor').trigger('drop');
		cy.get('@burgerConstructor').trigger('dragend');

		cy.get('@ingredient2').trigger('dragstart');
		cy.get('@burgerConstructor').trigger('drop');
		cy.get('@burgerConstructor').trigger('dragend');


		cy.get('@ingredientName1').then((ingredientName1) => {
			cy.get('@burgerConstructor').should('contain', ingredientName1);
		});

		cy.get('@ingredientName2').then((ingredientName2) => {
			cy.get('@burgerConstructor').should('contain', ingredientName2);
		});
	});

	it('Should make order', () => {
		cy.get('button').contains('Оформить заказ').click()

		cy.wait('@postOrder').then((interception) => {
			cy.get('[data-testId=modal]').should('be.visible');

			cy.get('[data-testId=modal]').within(() => {
				cy.get('.text_type_digits-large').should('contain', interception.response.body.order.number);
			});
		});
	});
});