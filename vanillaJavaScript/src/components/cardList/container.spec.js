describe("cardList component test", function() {
	
	/* jshint -W110 */
	const jsonString = '[{"id":"1","name":"Little Sock","description":"Little Sock was brought to Tony\'s Cats Home as his owners were moving house and couldn\'t take him with them. He is an affectionate boy that loves nothing more than being stroked and sitting on a lap having extra cuddles, he will purr with delight. "},{"id":"2","name":"Fluffy","description":"He is a young and active cat. If owners work full-time he will need cat flap access to outside so he can come and go as he pleases throughout the day. Fluffly is a true rescue cat who will make a lovely companion when settled in his new home."},{"id":"3","name":"Luna","description":"Luna is a real sweetie who loves nothing more than a good snuggle up to her favourite people. She is also very playful and loves to play string toy games. She will make a great addition to the family and will provide a lot of love and laughter through the years! "},{"id":"4","name":"Bella","description": "She is a loving and playful youngster that enjoys interacting with people, being stroked and groomed, she is a cuddly girl. Being young and active Bella will need cat flap access to outside if owners are working full-time, she loves exploring her territory, playing and sunbathing. "}]';
	/* jshint +W110 */
	
	
	
	it("Should retrieve data", function() {
		spyOn(cardList, "retrieveData").and.callFake(function(callback) {
			callback(jsonString);
		});
		
		var callback = function(responseText) {
			expect(responseText.indexOf("than a good snuggle")).toBeGreaterThan(10);
		};
		cardList.retrieveData(callback);
		
		callback = jasmine.createSpy();
		cardList.retrieveData(callback);
		expect(callback).toHaveBeenCalled();
	});
	
	
	
	it("Should sort array", function() {
		expect(JSON.parse(jsonString)[0].name).toBe("Little Sock");
		expect(cardList.sortData(JSON.parse(jsonString))[0].name).toBe("Bella");
	});
	
	
	
	it("Should filter array", function() {
		expect(cardList.filter(JSON.parse(jsonString), "bella").length).toBe(1);
		expect(cardList.filter(JSON.parse(jsonString), "little sock")[0].name).toBe("Little Sock");
	});
	
	
	
	it("Should populate template", function() {
		var containerPopulated = cardList.render(document.createElement("div"),
				JSON.parse(jsonString),
				window.__html__["src/components/cardList/card.tpl.htm"]);
				
		expect(containerPopulated.children.length).toBe(4);
		expect(containerPopulated.children[3].children[1].children[0].innerHTML).toBe("Bella");
	});

});
