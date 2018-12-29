describe("$achQueries factory test", function() {
	/* jshint -W110 */
	var $httpBackend;
	var $achQueries;
	var jsonString = '[{"id":"1","name":"Little Sock","description":"Little Sock was brought to Tony\'s Cats Home as his owners were moving house and couldn\'t take him with them. He is an affectionate boy that loves nothing more than being stroked and sitting on a lap having extra cuddles, he will purr with delight. "},{"id":"2","name":"Fluffy","description":"He is a young and active cat. If owners work full-time he will need cat flap access to outside so he can come and go as he pleases throughout the day. Fluffly is a true rescue cat who will make a lovely companion when settled in his new home."},{"id":"3","name":"Luna","description":"Luna is a real sweetie who loves nothing more than a good snuggle up to her favourite people. She is also very playful and loves to play string toy games. She will make a great addition to the family and will provide a lot of love and laughter through the years! "},{"id":"4","name":"Bella","description": "She is a loving and playful youngster that enjoys interacting with people, being stroked and groomed, she is a cuddly girl. Being young and active Bella will need cat flap access to outside if owners are working full-time, she loves exploring her territory, playing and sunbathing. "}]';
	/* jshint +W110 */
	
	beforeEach(function() {
		module("ach");
		
		inject(function(_$httpBackend_, _$achQueries_) {
			$httpBackend = _$httpBackend_;
			$achQueries = _$achQueries_;
		});
		
		$httpBackend.whenGET("data/cats.json").respond(jsonString);
	});
	
	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});
	
	// https://stackoverflow.com/questions/15048132/angularjs-promise-not-being-resolved-in-unit-test
	// https://stackoverflow.com/questions/24390261/how-to-mock-an-angular-http-call-and-return-a-promise-object-that-behaves-like
	it("Should return valid JSON", function() {
		$httpBackend.expectGET("data/cats.json");
		$achQueries.cards().then(function(results) {
			expect(results.length).toBe(4);
			expect(results[0].name).toBe("Little Sock");
		}, function(e) {
			expect(e).toBe(null); // If code goes through here an exception must be thrown
		});
		$httpBackend.flush();
	});
});
