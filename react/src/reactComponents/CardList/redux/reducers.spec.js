import reducers from "./reducers.js";

describe("reducers", () => {
	
	it("Should handle RECEIVE_ITEMS action", () => {
		let state = reducers({
				items:[],
				itemSelected:"",
				filterString:""
			},
			{
				type:"RECEIVE_ITEMS",
				items: [
					{id:"4",name:"Bella",description:""},
					{id:"2",name:"Fluffy",description:""},
					{id:"1",name:"Little Sock",description:""},
					{id:"3",name:"Luna",description:""}
				]
			});
			
		expect(state.items.length).toBe(4);
		expect(state.items[1].name).toBe("Fluffy");
		expect(state.items[2].name).toBe("Little Sock");
		expect(state.items[3].name).toBe("Luna");
	});



	it("Should handle SET_CARD_SELECTED action", () => {
		let state = reducers({itemSelected:"", filterString:""}, {type:"SET_CARD_SELECTED",card:{id:"4",name:"Bella",description:""}});
		
		expect(state.itemSelected).toBe("4");
	});
	
	
	
	it("should handle SET_FILTER_STRING action", () => {
		let state = reducers({
				items: [
					{id:"4",name:"Bella",description:""},
					{id:"2",name:"Fluffy",description:""},
					{id:"1",name:"Little Sock",description:""},
					{id:"3",name:"Luna",description:""}
				],
				itemSelected: "",
				filterString: ""
			}, {
				type: "SET_FILTER_STRING",
				filterString: "lit"
			});
		expect(state.filterString).toEqual("lit");
	});

});
