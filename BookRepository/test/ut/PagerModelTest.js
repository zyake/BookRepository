test("testGetAmountPageSize_normal", function() {
	var target = createDefaultPagerModel();
	 target.set("serverItemSize", 500);
	 target.set("maxPerPageSize", 10);

	 var size = target.getAmountPageSize();

	 equal(size, 50);
});

test("testGetAmountPageSize_normal_hasRest", function() {
	var target = createDefaultPagerModel();
	 target.set("serverItemSize", 10);
	 target.set("maxPerPageSize", 3);

	 var size = target.getAmountPageSize();

	 equal(size, 4);
});

test("testGetAmountPageSize_normal_noServerItem", function() {
	var target = createDefaultPagerModel();
	 target.set("serverItemSize", 0);
	 target.set("maxPerPageSize", 10);

	 var size = target.getAmountPageSize();

	 equal(size, 0);
});

test("testCanGoBack_normal_indexFirst", function() {
	var target = createDefaultPagerModel();
	 target.set("serverItemSize", 100);
	 target.set("maxPerPageSize", 10);
	 target.set("currentIndex", 1);

	 var canGoBack = target.canGoBack();

	 equal(canGoBack, false);
});

test("testCanGoBack_normal_indexSecond", function() {
	var target = createDefaultPagerModel();
	 target.set("serverItemSize", 100);
	 target.set("maxPerPageSize", 10);
	 target.set("currentIndex", 2);

	 var canGoBack = target.canGoBack();

	 equal(canGoBack, true);
});

test("testCanGoBack_normal_indexMiddle", function() {
	var target = createDefaultPagerModel();
	 target.set("serverItemSize", 100);
	 target.set("maxPerPageSize", 10);
	 target.set("currentIndex", 5);

	 var canGoBack = target.canGoBack();

	 equal(canGoBack, true);
});

test("testCanGoNext_normal_indexLast", function() {
	var target = createDefaultPagerModel();
	 target.set("serverItemSize", 100);
	 target.set("maxPerPageSize", 10);
	 target.set("currentIndex", 10);

	 var canGoNext = target.canGoNext();

	 equal(canGoNext, false);
});

test("testCanGoNext_normal_indexSecond", function() {
	var target = createDefaultPagerModel();
	 target.set("serverItemSize", 100);
	 target.set("maxPerPageSize", 10);
	 target.set("currentIndex", 9);

	 var canGoNext = target.canGoNext();

	 equal(canGoNext, true);
});

test("testCanGoNext_normal_indexMiddle", function() {
	var target = createDefaultPagerModel();
	 target.set("serverItemSize", 100);
	 target.set("maxPerPageSize", 10);
	 target.set("currentIndex", 5);

	 var canGoNext = target.canGoNext();

	 equal(canGoNext, true);
});

test("testRefresh_normal_fetchModel", function() {
	// init
	var target = createDefaultPagerModel();
	 target.set("serverItemSize", 100);
	 target.set("maxPerPageSize", 10);
	 target.set("currentIndex", 5);

	 var fetchArgs;
	 target.fetch = function(arg) { fetchArgs = arg }
	 target.collection.fetch = function() {}

	 // test
	 target.refresh();

	 // assert
	 var expected = {
		 data: {
			 currentIndex: 5,
			 maxPerPageSize: 10,
			 serverItemSize: 100
		},
		 url: "PAGER_URL"
	 };
	 deepEqual(fetchArgs, expected);;
});

test("testRefresh_normal_fetchCollection", function() {
	// init
	var target = createDefaultPagerModel();
	 target.set("serverItemSize", 100);
	 target.set("maxPerPageSize", 10);
	 target.set("currentIndex", 5);

	 var fetchArgs;
	 target.fetch = function(arg) {}
	 target.collection.fetch = function(arg) { fetchArgs = arg }

	 // test
	 target.refresh();

	 // assert
	 var expected = {
		data: { size: 10, index: 5 },
		 url: "COLLECTION_URL"
	 };
	 deepEqual(fetchArgs, expected);;
});

function createDefaultPagerModel() {
	 var target  = new PagerModel({
		 pagerUrl: "PAGER_URL",
		 collectionUrl: "COLLECTION_URL",
		 collection: new BookCollection()
	 });

	 return target;
}