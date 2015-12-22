module.exports = function (grunt) {

	require('time-grunt')(grunt);
	require('load-grunt-tasks')(grunt);

	grunt.loadNpmTasks('grunt-qunit-junit');
	grunt.task.loadTasks('build/grunt-kpi-config');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		clean : ['target'],

		bower: {
			install: {
				options: {
					targetDir: 'libraries',
					layout: 'byComponent',
					cleanBowerDir: true
				}
			}
		},
		kpi: {
			default:{
				src:'app/config/kpis.json',
				target:{
					file:'app/engines/analytics/kpis.js',
					token:'KPIs_JSON_TOKEN',
					content:'Love.define(\'Config.KPIs\',[],function () { WARNING_TOKEN\n return KPIs_JSON_TOKEN; });'
				}
			}
		},
		jsbeautifier : {
			files : ["app/engines/analytics/kpis.js"],
			options : {
			}
		},
		concat: {
			libraries: {
				options: {
					separator: ';'
				},
				files: {
					'libraries/bucky/js/bucky.noamd.js': ['libraries/wrap.pre.js', 'libraries/bucky/js/bucky.js', 'libraries/wrap.post.js'],
					'libraries/ubjq.noamd.js': [
						'libraries/wrap.pre.js',

						'libraries/moment/moment.js',
						'libraries/moment.wrap.post.js',

						'libraries/jquery/js/jquery.js',
						'libraries/jQuery.XDomainRequest/js/jQuery.XDomainRequest.js',
						"libraries/jquery.cookie/js/jquery.cookie.js",
						"libraries/jQuery.jCarousellite/jcarousellite-1.6.js",
						"libraries/jquery.scrollTo/js/jquery.scrollTo.js",
						"libraries/rangy/rangy-core.js",
						"libraries/rangy/rangy-selectionsaverestore.js",
						"libraries/rangy/rangy-textrange.js",
						"libraries/onSelect/js/onSelect.jquery.min.js",
						"libraries/jquery-colorbox/js/jquery.colorbox.js",
						"libraries/classval/js/jquery.classval.js",
						"libraries/nouislider/js/Link.js",
						"libraries/nouislider/js/jquery.nouislider.js",
						"libraries/raty/js/jquery.raty.js",
						"libraries/clndr/clndr.min.js",
						"libraries/flipclock/js/flipclock.js",
						"libraries/flexslider-legacy/jquery.flexslider.js",
						"libraries/ouibounce/js/ouibounce.js",
						"libraries/jquery.hoverIntent/js/jquery.hoverIntent.js",
					/** vvvvvv keep these together**/
						'libraries/wrapEasing.pre.js',
						"libraries/jquery.easing/js/jquery.easing.js",
						'libraries/wrapEasing.post.js',
					/** ^^^^^^ keep these together**/
						"libraries/jquery.modernCarousel/js/jquery.carousel.2.1.js",
						"libraries/waypoints/js/jquery.waypoints.js",
						'libraries/underscore/js/underscore.js',
						'libraries/backbone/js/backbone.js',
						'libraries/backbone-validation.wrap.pre.js',
						'libraries/backbone-validation/js/backbone-validation.js',
						'libraries/backbone-validation.wrap.post.js',
						'libraries/backbone-deep-model/js/deep-model.js',
						'libraries/underscore.extensions/underscore.mixin.deepExtend.js',

						'libraries/bootstrap-sass-official/javascripts/bootstrap/transition.js',
//						'libraries/bootstrap-sass-official/javascripts/bootstrap/alert.js', // uncomment if you want to use that
//						'libraries/bootstrap-sass-official/javascripts/bootstrap/button.js', // uncomment if you want to use that
						'libraries/bootstrap-sass-official/javascripts/bootstrap/carousel.js',
						'libraries/bootstrap-sass/custom/js/carousel.js',
						'libraries/bootstrap-sass-official/javascripts/bootstrap/collapse.js', // uncomment if you want to use that
//						'libraries/bootstrap-sass-official/javascripts/bootstrap/dropdown.js', // uncomment if you want to use that
						'libraries/bootstrap-sass-official/javascripts/bootstrap/modal.js',
//						'libraries/bootstrap-sass-official/javascripts/bootstrap/scrollspy.js', // uncomment if you want to use that
						'libraries/bootstrap-sass-official/javascripts/bootstrap/tab.js',
						'libraries/bootstrap-sass-official/javascripts/bootstrap/tooltip.js',
						'libraries/bootstrap-sass-official/javascripts/bootstrap/popover.js',
//						'libraries/bootstrap-sass-official/javascripts/bootstrap/affix.js', // uncomment if you want to use that

						'libraries/bootstrap-switch/js/bootstrap-switch.js',

						"libraries/raygun4js/js/raygun.dev.js",
						'libraries/jquery.wrap.post.js',
						'libraries/wrap.post.js'],
					'libraries/select2/select2.wrapped.js': ['libraries/select2.wrap.pre.js', 'libraries/select2/select2.js', 'libraries/select2.wrap.post.js'],
					'libraries/mustache/js/mustache.noamd.js': ['libraries/wrap.pre.js', 'libraries/mustache/js/mustache.js', 'libraries/wrap.post.js'],
					'libraries/uri.js/js/uri.noamd.js': ['libraries/wrap.pre.js', 'libraries/uri.js/js/URI.js', 'libraries/wrap.post.js'],
					'libraries/uri.js.extensions/URI.fragmentQuery.noamd.js': ['libraries/wrap.pre.js', 'libraries/uri.js.extensions/URI.fragmentQuery.js', 'libraries/wrap.post.js'],
					'libraries/bowser/bowser.noamd.js': ['libraries/wrap.pre.js', 'libraries/bowser/bowser.js', 'libraries/wrap.post.js'],
					'libraries/jquery.cookie/js/jquery.cookie.noamd.js': ['libraries/wrap.pre.js', 'libraries/jquery.cookie/js/jquery.cookie.js', 'libraries/wrap.post.js']
				}
			},
			prod: {
				options: {
					separator: ';'
				},
				files: {
					'../js/fedapp/bowser.noamd.js': ['libraries/wrap.pre.js', 'libraries/bowser/bowser.js', 'libraries/wrap.post.js'],
					'../js/fedapp/libs.noamd.js':[
						'libraries/wrap.pre.js',
						"libraries/moment/moment.js",
						'libraries/moment.wrap.post.js',
						"libraries/jquery/js/jquery.js",
						'libraries/jQuery.XDomainRequest/js/jQuery.XDomainRequest.js',
						"libraries/jquery.cookie/js/jquery.cookie.js",
						"libraries/jQuery.jCarousellite/jcarousellite-1.6.js",
						"libraries/jquery.scrollTo/js/jquery.scrollTo.js",
						"libraries/rangy/rangy-core.js",
						"libraries/rangy/rangy-selectionsaverestore.js",
						"libraries/rangy/rangy-textrange.js",
						"libraries/onSelect/js/onSelect.jquery.min.js",
						"libraries/jquery-colorbox/js/jquery.colorbox.js",
						"libraries/classval/js/jquery.classval.js",
						"libraries/nouislider/js/Link.js",
						"libraries/nouislider/js/jquery.nouislider.js",
						"libraries/raty/js/jquery.raty.js",
						"libraries/clndr/clndr.min.js",
						"libraries/flipclock/js/flipclock.js",
						"libraries/flexslider-legacy/jquery.flexslider.js",
						"libraries/ouibounce/js/ouibounce.js",
						"libraries/jquery.hoverintent/js/jquery.hoverIntent.js",

						/** vvvvvv keep these together**/
						'libraries/wrapEasing.pre.js',
						"libraries/jquery.easing/js/jquery.easing.js",
						'libraries/wrapEasing.post.js',
						/** ^^^^^^ keep these together**/

						"libraries/jquery.modernCarousel/js/jquery.carousel.2.1.js",
						"libraries/waypoints/js/jquery.waypoints.js",
						"libraries/underscore/js/underscore.js",
						"libraries/backbone/js/backbone.js",
						'libraries/backbone-validation/js/backbone-validation.js',
						'libraries/backbone-deep-model/js/deep-model.js',
						'libraries/underscore.extensions/underscore.mixin.deepExtend.js',
						"libraries/birdwatcherjs/js/birdwatcher.js",

						'libraries/bootstrap-sass-official/javascripts/bootstrap/transition.js',
//						'libraries/bootstrap-sass-official/javascripts/bootstrap/alert.js', // uncomment if you want to use that
//						'libraries/bootstrap-sass-official/javascripts/bootstrap/button.js', // uncomment if you want to use that
						'libraries/bootstrap-sass-official/javascripts/bootstrap/carousel.js',
						'libraries/bootstrap-sass/custom/js/carousel.js',
						'libraries/bootstrap-sass-official/javascripts/bootstrap/collapse.js', // uncomment if you want to use that
//						'libraries/bootstrap-sass-official/javascripts/bootstrap/dropdown.js', // uncomment if you want to use that
						'libraries/bootstrap-sass-official/javascripts/bootstrap/modal.js',
//						'libraries/bootstrap-sass-official/javascripts/bootstrap/scrollspy.js', // uncomment if you want to use that
						'libraries/bootstrap-sass-official/javascripts/bootstrap/tab.js',
						'libraries/bootstrap-sass-official/javascripts/bootstrap/tooltip.js',
						'libraries/bootstrap-sass-official/javascripts/bootstrap/popover.js',
//						'libraries/bootstrap-sass-official/javascripts/bootstrap/affix.js', // uncomment if you want to use that

						'libraries/bootstrap-switch/js/bootstrap-switch.js',

						"libraries/deputize/js/deputize.js",
						"libraries/mustache/js/mustache.js",
						"libraries/raven-js/raven.js",
						"libraries/raygun4js/js/raygun.dev.js",
						/** Make sure to keep Select2 in its own wrapper **/
						'libraries/select2.wrap.pre.js',
						'libraries/select2/select2.js',
						'libraries/select2.wrap.post.js',
						/** Make sure to keep Select2 in its own wrapper **/
						"libraries/uri.js/js/URI.js",
						"libraries/uri.js.extensions/URI.fragmentQuery.js",
						"libraries/statc/statc.js",
						'libraries/jquery.wrap.post.js',
						'libraries/wrap.post.js'],
					'../js/fedapp/base.js':[
						"app/decodes.js",
						"app/config.js",
						"app/env.js",
						"app/engines/dom.js",
						"app/engines/codetools.js",
						"app/engines/ui.js",
						"app/engines/template.js",
						"app/engines/log.js",
						"app/engines/error.js",
						"app/controllers/base.js",
						"app/engines/mvc.js",
						"app/engines/validation.js",
						"app/engines/uri.js",
						"app/engines/date.js",
						"app/engines/agent.js",
						"app/engines/analytics/consumer_analytics.js",
						"app/engines/analytics/travel_analytics.js",
						"app/engines/analytics/ads_analytics.js",
						"app/engines/analytics/sales_analytics.js",
						"app/engines/analytics/kpis.js",
						"app/engines/analytics/kpi_analytics.js",
						"app/engines/analytics/analytics.js",
						"app/engines/mvt.js",
						"app/engines/social.js",
						"app/models/users/UserModel.js",
						"app/models/users/currentUserModel.js",
						'app/routes/TabRouter.js'
					],
					'../js/fedapp/utils.js':[
						"app/utilities/errorPredicates.js",
						"app/utilities/interoprability/legacy_protocol.js",
						"app/utilities/FormatUtil.js",
						"app/utilities/client/ClientEnvironmentalProperties.js",
						"app/utilities/SupplierUtil.js",
						"app/utilities/search/SearchStateModelSerializer.js",
						"app/utilities/dataTransformation/DataTransformer.js",
						"app/utilities/dataTransformation/DataTransformerDecorator.js",
						"app/utilities/optimizely/ABTestRunner.js",
						"app/utilities/ImagePreloader.js",
						"app/utilities/StackTraceUtil.js",
						"app/utilities/ErrorConfig.js",
						"app/utilities/GeoLocationImageUtil.js",
						"app/utilities/StorageUtil.js"],
					'../js/fedapp/app.js':[
						"app/models/StateModel.js",
						"app/models/FacetsModel.js",
						"app/models/api/AbstractAPIModel.js",
						"app/models/HotelModel.js",
						"app/models/HotelPricingModel.js",
						"app/models/PaginationCollection.js",
						"app/models/VirtualPaginationCollection.js",
						"app/models/listings/ListingModel.js",
						"app/models/listings/ListingCollection.js",
						"app/models/search/SearchStateModel.js",
						"app/models/search/ComplexSearchProperty.js",
						"app/models/search/SearchHolidaysModel.js",
						"app/models/search/SearchRoomsModel.js",
						"app/models/search/SearchHolidaysPatchModel.js",
						"app/models/search/FacetedSearchHolidaysModel.js",
						"app/models/search/FacetedSearchHolidaysPatchModel.js",
						"app/models/search/dataTransformation/ChildrenCountDataTransformer.js",
						"app/models/search/dataTransformation/DestinationResortDataTransformer.js",
						"app/models/search/dataTransformation/DestinationResortDataPatchTransformer.js",
						"app/models/search/dataTransformation/DurationsDataPatchTransformer.js",
						"app/models/search/dataTransformation/DurationsDataTransformer.js",
						"app/models/tab/TabModel.js",
						"app/models/tab/TabCollection.js",
						"app/models/shortlist/ShortlistHotelModel.js",
						"app/models/shortlist/ShortlistTabModel.js",
						"app/models/shortlist/ShortlistTabCollection.js",
						"app/models/shortlist/HotelsCollection.js",
						"app/models/shortlist/CompareHotelsCollection.js",
						"app/models/shortlist/HeartHotelsCollection.js",
						"app/models/shortlist/RecentHotelsCollection.js",
						"app/models/alternatives/AlternativeModel.js",
						"app/models/alternatives/dataTransformation/AlternativesDataTransformer.js",
						"app/models/alternatives/dataTransformation/AlternativeDataTransformer.js",
						"app/models/alternatives/dataTransformation/PythonAlternativeDataTransformer.js",
						"app/models/alternatives/dataTransformation/PackageAlternativesDataTransformer.js",
						"app/controllers/feedback/FeedbackController.js",
						"app/controllers/tracking/TrackingController.js",
						"app/controllers/HeaderController.js",
						"app/controllers/FooterController.js",
						"app/controllers/api/ApiController.js",
						"app/controllers/api/FacetApiController.js",
						"app/controllers/api/SearchApiController.js",
						"app/controllers/api/SearchSummaryApiController.js",
						"app/controllers/api/StateApiController.js",
						"app/controllers/api/MonthAvailabilityApiController.js",
						"app/controllers/api/AnnualAvailabilityApiController.js",
						"app/controllers/api/AnnualPackageAvailabilityApiController.js",
						"app/controllers/api/SearchSummaryPatchApiController.js",
						"app/controllers/api/SearchRecordsApiController.js",
						"app/controllers/api/BookingHandoffApiController.js",
						"app/controllers/HomeController.js",
						"app/controllers/BlogController.js",
						"app/controllers/CommonController.js",
						"app/controllers/PublicCommonController.js",
						"app/controllers/TextSearchController.js",
						"app/controllers/DepositController.js",
						"app/controllers/SupportController.js",
						"app/controllers/FAQController.js",
						"app/controllers/LandingPageController.js",
						"app/controllers/SEOLandingPageController.js",
						"app/controllers/DestinationLPController.js",
						"app/controllers/SalesPageController.js",
						"app/controllers/HolidaysController.js",
						"app/controllers/LateDealsController.js",
						"app/controllers/search/SearchHomeController.js",
						"app/controllers/search/SearchStateController.js",
						"app/controllers/search/SearchHolidaysController.js",
						"app/controllers/search/SearchLateDealsController.js",
						"app/controllers/shortlist/ShortlistController.js",
						"app/views/components/CountToggler.js",
						"app/views/components/ValidationFields.js",
						"app/views/components/WrappingValidationField.js",
						"app/views/components/CreditCardValidationField.js",
						"app/views/components/CCSecurityCodeValidationField.js",
						"app/views/alternatives/DropDownSelectView.js",
						"app/views/footer/NewsletterSignInView.js",
						"app/views/header/NewsletterBarView.js",
						"app/views/footer/NewsletterBarInsetView.js",
						"app/views/other/NewsletterWidgetView.js",
						"app/views/footer/SeoFooterTabsView.js",
						"app/views/header/MastheadView.js",
						"app/views/header/MastheadSupportView.js",
						"app/views/header/HolidayEnquireView.js",
						"app/views/feedback/FeedbackView.js",
						"app/views/feedback/FeedbackModalView.js",
						"app/views/shortlist/ShortlistView.js",
						"app/views/shortlist/ShortlistHotelView.js",
						"app/views/shortlist/ShortlistTabView.js",
						"app/views/shortlist/ShortlistCompareTabView.js",
						"app/views/shortlist/ShortlistHeartTabView.js",
						"app/views/shortlist/ShortlistRecentTabView.js",
						"app/views/shortlist/HeartButtonView.js",
						"app/views/TitledView.js",
						"app/views/OverlayView.js",
						"app/views/HotelQAView.js",
						"app/views/search/SearchView.js",
						"app/views/search/FlatSearchView.js",
						"app/views/search/HorizontalSearchView.js",
						"app/views/search/LateDealsSearchView.js",
						"app/views/search/SearchSummary.js",
						"app/views/PaginationView.js",
						"app/views/search/GroupPricingView.js",
						"app/views/search/SearchSorting.js",
						"app/views/search/SearchResults.js",
						"app/views/search/MultiFieldSelect.js",
						"app/views/search/SearchMultiRoomsView.js",
						"app/views/search/filtering/BaseFilterFieldView.js",
						"app/views/search/filtering/SliderFilterFieldView.js",
						"app/views/search/filtering/RatingFilterFieldView.js",
						"app/views/search/filtering/CheckListFilterFieldView.js",
						"app/views/search/filtering/DurationsFilterFieldView.js",
						"app/views/search/filtering/FreeTextFilterFieldView.js",
						"app/views/search/filtering/FiltersView.js",
						"app/views/calendar/CalendarView.js",
						"app/views/calendar/DatePickerView.js",
						"app/views/calendar/DateInputView.js",
						"app/views/modals/exitClick/CouponView.js",
						"app/views/modals/exitClick/NotTheHotelView.js",
						"app/views/modals/exitClick/NotTheHotelHeaderView.js",
						"app/views/alternatives/HandoffProcessView.js",
						"app/views/home/HandoffProcessByShortrefView.js",
						"app/views/home/SearchByShortrefView.js",
						"app/views/modals/InterstitialModalView.js",
						"app/views/modals/LightInterstitialModalView.js",
						"app/views/TabView.js",
						"app/views/TabbedView.js",
						"app/views/TabbedListView.js",
						"app/views/MapView.js",
						"app/views/VideoView.js",
						"app/views/CarouselView.js",
						"app/views/DepositView.js",
						"app/views/lateDeals/LateOfferResult.js",
						"app/views/search/SearchOfferResult.js",
						"app/views/search/PrerenderedSearchOfferResult.js",
						"app/views/lateDeals/LateDealBox.js",
						"app/views/lateDeals/LateDealCounterView.js",
						"app/views/lateDeals/FlipClockCounter.js",
						"app/views/PopupCarouselView.js",
						"app/views/LightboxGalleryView.js",
						"app/views/PanoramioGalleryView.js",
						"app/views/home/HomeView.js",
						"app/views/home/LastSearchView.js",
						"app/views/search/SearchTopperView.js",
						"app/views/AlertView.js"
					],
					'../js/fedapp/hotel.js':[
						"app/controllers/HotelDetailController.js",
						"app/controllers/StaticHotelDetailController.js",
						"app/views/hotelDetail/HotelDetailView.js",
						"app/views/hotelDetail/HotelHeaderView.js",
						"app/views/hotelDetail/HotelSidebarView.js",
						"app/views/hotelDetail/tabs/HotelDescriptionTabView.js",
						"app/views/hotelDetail/tabs/HotelMapTabView.js",
						"app/views/hotelDetail/tabs/HotelQnATabView.js",
						"app/views/hotelDetail/tabs/HotelVideoTabView.js",
						"app/views/hotelDetail/tabs/HotelReviewsTabView.js",
						"app/views/hotelDetail/tabs/ResortGuideTabView.js",
						"app/views/search/SearchTopperView.js"
					],
					'../js/fedapp/panda.js':[
						"app/models/search/hotelOnly/SearchHotelOnlyModel.js",
						"app/models/search/hotelOnly/HotelOnlyRoomOfferModel.js",
						"app/models/search/hotelOnly/HotelOnlyRoomOffersCollection.js",
						"app/models/alternatives/PackageAlternativesSearchModel.js",
						"app/models/search/SearchPackagePandaModel.js",
						"app/controllers/api/SearchHotelOnlyApiController.js",
						"app/controllers/availability/SearchHotelOnlyController.js",
						"app/views/hotelOnly/HotelOnlyOffersView.js",
						"app/views/hotelOnly/PricePromiseView.js",
						"app/models/search/SearchPandaModel.js",
						"app/controllers/PackagePandaController.js",
						"app/controllers/FedPackagePandaController.js",
						"app/controllers/PandaController.js",
						"app/controllers/availability/PandaHolidaysController.js",
						"app/controllers/search/SearchPandaController.js",
						"app/controllers/calendar/CalendarPandaController.js",
						"app/models/alternatives/AlternativesCollection.js",
						"app/models/alternatives/AlternativesSearchModel.js",
						"app/controllers/api/AlternativesApiController.js",
						"app/controllers/alternatives/AlternativesPandaController.js",
						"app/controllers/packageAvailability/PandaPackageController.js",
						"app/controllers/search/SearchPackagePandaController.js",
						"app/controllers/alternatives/PackageAlternativesPandaController.js",
						"app/views/alternatives/AlternativesView.js",
						"app/views/alternatives/AlternativesResultsView.js",
						"app/views/alternatives/DepartureAirportSearchView.js",
						"app/views/alternatives/BoardBasisSearchView.js",
						"app/views/alternatives/HotelRecapView.js",
						"app/views/alternatives/CheapestAlternativeView.js",
						"app/views/alternatives/CheapestOfferView.js",
						"app/views/alternatives/CheapestPackageOfferView.js",
						"app/views/alternatives/CollapsibleHotelRecapView.js",
						"app/views/alternatives/PackageAlternativesView.js",
						"app/views/alternatives/NumNightsSearchView.js"
					],
					'../js/fedapp/booking.js':[
						"app/models/booking/ThreeStepBasketModel.js",
						"app/models/booking/BasketSelectionModel.js",
						"app/models/booking/BasketPassenger.js",
						"app/models/booking/BasketPassengersCollection.js",
						"app/models/booking/BasketPayment.js",
						"app/models/booking/alternativeFlights/AlternativeFlightModel.js",
						"app/models/booking/alternativeFlights/AlternativeFlightsCollection.js",
						"app/controllers/api/BookingProcessAPIController.js",
						"app/controllers/PackageBookingProcessController.js",
						"app/controllers/booking/BookingControllerGlobals.js",
						"app/controllers/booking/BookingProcessController.js",
						"app/controllers/booking/BookingStepController.js",
						"app/controllers/BookingCommonController.js",
						"app/views/booking/BookingCountdownView.js",
						"app/views/booking/BookingProgressView.js",
						"app/views/booking/BookingOfferSideBar.js",
						"app/views/booking/ThreeStep/BookingOfferSummaryView.js",
						"app/views/booking/ThreeStep/BookingAlternativeFlightView.js",
						"app/views/booking/ThreeStep/alternativeFlights/BookingAlternativeFlightsAlternatives.js",
						"app/views/booking/payment/BookingPaymentView.js",
						"app/views/booking/payment/BookingPaymentDepositsView.js",
						"app/views/booking/payment/BookingPaymentCardView.js",
						"app/views/booking/payment/BookingFlexibleDepositView.js",
						"app/views/booking/payment/BookingFlexibleDateView.js",
						"app/views/booking/offerSummary/BookingMultiRoomView.js",
						"app/views/booking/offerSummary/InsuranceOptions.js",
						"app/views/booking/offerSummary/BookingOfferSummaryView.js",
						"app/views/booking/offerSummary/BookingInsuranceView.js",
						"app/views/booking/offerSummary/BookingBaggageView.js",
						"app/views/booking/offerSummary/BookingHandBaggageView.js",
						"app/views/booking/offerSummary/BookingExtrasView.js",
						"app/views/booking/offerSummary/BookingSpecialRequestsView.js",
						"app/views/booking/offerSummary/BookingTransfersView.js",
						"app/views/booking/ThreeStep/BookingConfirmationView.js",
						"app/views/booking/BookingView.js",
						"app/views/booking/BookingConfirmationSideBarView.js",
						"app/views/booking/modals/SendBooking.js",
						"app/views/booking/BookingNotificationView.js",
						"app/views/booking/BookingReviewWidget.js",
						"app/views/booking/BookingErrorPanel.js",
						"app/views/PeopleViewingPopup.js",
						"app/views/StepView.js",
						"app/views/booking/passenger/BookingPassengerView.js",
						"app/views/booking/passenger/BookingRoomView.js",
						"app/views/booking/passenger/BookingAddressView.js",
						"app/views/booking/passenger/BookingAbstractPassengerView.js",
						"app/views/booking/passenger/BookingAdultPassengerView.js",
						"app/views/booking/passenger/BookingChildPassengerView.js",
						"app/views/booking/passenger/BookingInfantPassengerView.js",
						"app/views/manageBooking/ManageBookingFrameView.js",
						"app/controllers/booking/ManageMyBookingController.js",
						"app/controllers/CallCentreController.js",
						"app/controllers/EnquireController.js",
						"app/controllers/booking/BookingHandoffController.js"
					],
					'../js/fedapp/manage.js':[
						'app/controllers/manage/ManageController.js',
						'app/controllers/manageBooking/ManageMyBookingController.js',
						'app/controllers/manage/tabs/ManageTabBookingController.js',
						'app/controllers/manage/tabs/ManageTabFlightController.js',
						'app/controllers/manage/tabs/ManageTabHotelController.js',
						'app/controllers/manage/tabs/ManageTabTransfersController.js',
						'app/controllers/manage/tabs/ManageTabInsuranceController.js',
						'app/controllers/manage/tabs/ManageTabDetailsController.js',
						'app/controllers/manage/tabs/ManageTabPaymentController.js',
						'app/controllers/manage/tabs/ManageTabAmendController.js',
						'app/controllers/manage/ManageTravelDocumentsController.js',
						'app/controllers/manage/ManageContactController.js',
						'app/models/manage/TravelDocumentModel.js',
						'app/models/manage/TravelDocumentsCollection.js',
						'app/views/manage/ManageTravelDocumentsView.js',
						'app/views/manage/ManageTravelDocumentVoucherView.js',
						'app/models/manage/ManageAPIModel.js',
						'app/views/FormView.js',
						'app/models/formModel.js',
						'app/views/manage/ManagePaymentView.js',
						'app/views/manage/ManageAPIView.js',
						'app/views/manage/ManageAmendView.js',
						'app/models/manage/ManageContactModel.js',
						'app/models/manage/ManagePaymentModel.js',
						'app/views/manage/ManageTravelDocumentDownloadView.js',
						'app/controllers/manage/ManageDownloadDocumentsController.js',
						'app/controllers/manage/tabs/ManageTabAPIController.js'
					]
				}
			},
			templates: {
				options: {
					separator: ''
				},
				files: {
					'app/templates/templates.html': ['app/templates/*.mustache', 'app/templates/**/*.mustache']
				}
			},
			tests: {
				options: {
					separator: ''
				},
				files: {
					'test/fixtfills.js': ['test/fixtfills/**/*.fixture.js', 'test/fixtfills/*.fixture.js', 'test/fixtfills/**/*.polyfill.js', 'test/fixtfills/*.polyfill.js'],
					'test/tests.js': ['test/app/**/*.test.js', 'test/app/*.test.js']
				}
			}
		},
		uglify: {
			local: {
				options: {
					mangle: false,
					beautify: true
				},
				files: {
					'../js/fedapp/libs.noamd.js': ['../js/fedapp/libs.noamd.js'],
					'../js/fedapp/base.js':['../js/fedapp/base.js'],
					'../js/fedapp/utils.js':['../js/fedapp/utils.js'],
					'../js/fedapp/app.js':['../js/fedapp/app.js']
				}
			},
			prod: {
				options: {
					mangle: true,
					beautify : {
						ascii_only : true,
						quote_keys: true
					}
				},
				files: {
					'../js/fedapp/libs.noamd.js': ['../js/fedapp/libs.noamd.js'],
					'../js/fedapp/base.js':['../js/fedapp/base.js'],
					'../js/fedapp/utils.js':['../js/fedapp/utils.js'],
					'../js/fedapp/app.js':['../js/fedapp/app.js']
				}
			}
		},
		watch: {
			templates: {
				files: ['app/templates/*.mustache', 'app/templates/**/*.mustache'],
				tasks: ['concat:templates'],
				options: {
					debounceDelay: 250
				}
			},
			libraries: {
				files: ['libraries/*.js', 'libraries/**/*.js'],
				tasks: ['concat:libraries'],
				options: {
					debounceDelay: 250
				}
			},
			scripts: {
				files: ['app/*.js', 'app/**/*.js'],
				tasks: ['jshint'],
				options: {
					debounceDelay: 250
				}
			},
			config: {
				files: ['app/config/*.json'],
				tasks: ['kpi','jsbeautifier'],
				options: {
					debounceDelay: 250
				}
			},
			tests: {
				files: ['test/app/**/*.test.js', 'test/app/*.test.js', 'test/fixtfills/**/*.fixture.js', 'test/fixtfills/*.fixture.js'],
				tasks: ['concat:tests'],
				options: {
					debounceDelay: 250
				}
			}
		},
		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				eqnull: true,
				browser: true,
				globals: {
					jQuery: true
				}
			},
			all: {
				options: {
				},
				files: {
					src: ['Gruntfile.js', 'app/*.js', 'app/**/*.js', '!app/**/*_scsslint_t*.js']
				}
			}
		},
		copy: {
			build:{

			},
			tests: {
				files: [
					{
						expand: true,
						flatten: true,
						src: ['libraries/**/js/*.js', 'libraries/**/*.js'],
						dest: 'test/_libs'
					}
				]
			}
		},
		// TESTING
		qunit: {
			options: {
				'phantomPath': './node_modules/.bin/phantomjs'
			},
			all: {
				options: {
					urls: [
						'http://localhost:9001/test/index.html',
						'http://localhost:9001/test/state.html',
						'http://localhost:9001/test/search.html',
						'http://localhost:9001/test/booking.html'
					]
				}
			}
		},
		// Start a server
		// ----------------------
		connect: {
			server: {
				options: {
					port: 9001
				}
			}
		},
		plato: {
			app : {
				files: {
					'reports': ['app/*.js','app/**/*.js']
				}
			}
		},
		search: {
//			obscenities: {
//				files: {
//					src: ["app/*.js","app/**/*.js"]
//				},
//				options: {
//					searchString: /(poop|fart|Barbara\sStreisand|fuck)/g,
//					logFile: "console",
//					logFormat: "console"
//				}
//			},

			// message when a personal to-do is unresolved
			todos: {
				files: {
					src: ["app/*.js","app/**/*.js"]
				},
				options: {
					searchString: /jTODO|gTODO|cTODO/,
					logFile: "console",
					logFormat: "console"
				}
			},

			// prevent commit when a important personal to-do is unresolved
			fataltodos: {
				files: {
					src: ["app/*.js","app/**/*.js"]
				},
				options: {
					searchString: /STUB/,
					failOnMatch: true,
					logFile: "console",
					logFormat: "console"
				}
			}
		}
	});

	/***
	 * Install requirments and make the dev environment
	 */
	grunt.registerTask('install', ['bower', 'make']);

	/***
	 * Make the dev environment
	 */
	grunt.registerTask('make', ['kpi','jsbeautifier','concat:libraries','concat:templates','concat:tests']);

	/***
	 * Make the production build )compression etc.) environment but allow env parameter overrides for the Dev test server, Staging server and Prod
	 */
	grunt.registerTask('build', ['clean','kpi','jsbeautifier','concat:libraries','concat:prod','concat:templates','concat:tests', 'uglify:prod', 'test']);

	/***
	 * Run the QUnit tests
	 */
	grunt.registerTask('test', ['jshint', 'connect', 'qunit_junit', 'qunit']);
	grunt.registerTask('test-dev', ['connect', 'watch']);
	grunt.registerTask('quality', ['plato']);

	grunt.registerTask('pre-commit', ['search']);
	grunt.registerTask('dev', ['watch']);
};
