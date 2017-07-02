! function(i) {
	"use strict";
	jQuery(window).load(function() {
		jQuery("#loaderInner").fadeOut(), jQuery("#loader").delay(200).fadeOut("slow")
	}), i(document).ready(function() {
		function e(i) {
			this.dropdown = i, this.opts = this.dropdown.find("ul.dropdown > li"), this.val = [], this.index = [], this.initEvents()
		}
		i(".menu li, .cart li").on("mouseover", function() {
			i(this).children("ul.dropDown").stop(!0, !0).fadeIn(200), i(this).children("ul.dropDown").css("display", "block")
		}).on("mouseleave", function() {
			i(this).children("ul.dropDown").stop(!0, !0).fadeOut(200)
		}), i(".main-slider").flexslider({
			animation: "fade",
			slideshow: !0,
			directionNav: !0
		}), i(".slider").flexslider({
			animation: "fade",
			slideshow: !0,
			directionNav: !0,
			controlNav: !1
		}), i(".work-slider, .prod-slider").flexslider({
			animation: "slide",
			slideshow: !0,
			directionNav: !1,
			controlNav: "thumbnails"
		}), i(".testi-slider").flexslider({
			animation: "slide",
			slideshow: !0,
			directionNav: !1,
			controlNav: !1,
			animationSpeed: 800
		}), /*i(".prod-info", ".product-container").css({
			opacity: 0
		}), i(".work-info", ".works-holder").css({
			opacity: 0
		}), i(".work-info, .prod-info").hover(function() {
			i(this).stop().animate({
				opacity: 0.8
			}, "slow")
		}, function() {
			i(this).stop().animate({
				opacity: 0
			}, "slow")
		}), i(".work-info, .prod-info").hover(function() {
			var e = i(this).find(".work-info"),
				a = i(this).height() / 2 - e.height() / 2,
				t = i(this).find(".prod-info"),
				o = i(this).height() / 2 - t.height() / 2;
			i(this).find(".info-inner ").css("bottom", a - 38), i(this).find(".prod-inner ").css("bottom", o - 60)
		}), */i(".venobox").venobox({
			titleattr: "data-title"
		});
		var a = i(".socials li a");
		i(".socials li a").hover(function() {
			a.stop().animate({
				opacity: .4
			}, "fast"), i(this).stop().animate({
				opacity: 1
			}, "fast")
		}, function() {
			a.stop().animate({
				opacity: 1
			}, "fast")
		});
		var t = i(".socials-work li a");
		i(".socials-work li a").hover(function() {
			t.stop().animate({
				opacity: .4
			}, "fast"), i(this).stop().animate({
				opacity: 1
			}, "fast")
		}, function() {
			t.stop().animate({
				opacity: 1
			}, "fast")
		}), i(".filter li a").click(function(e) {
			e.preventDefault(), i(this).addClass("active"), i(this).parent().siblings().find("a").removeClass("active");
			var a = i(this).attr("data-filter");
			if (i(this).closest(".works").find(".work").removeClass("disable"), "all" !== a)
				for (var t = i(this).closest(".works").find(".work"), o = 0; o < t.length; o++) t.eq(o).hasClass(a) || t.eq(o).addClass("disable")
		});
		var o = i(".works-holder.masonry");
		o.imagesLoaded(function() {
			o.masonry({
				itemSelector: ".work.masonry"
			})
		}), i(".hero").css("height", i(window).height());
		for (var r = 0; r < i(".vertical-align").length; r++) i(".vertical-align").eq(r).css("margin-top", (i(".vertical-align").parent().height() - i(".vertical-align").height()) / 2 - 25);
		for (var r = 0; r < i(".background-image").length; r++) {
			var n = i(".background-image").eq(r).children("img").attr("src");
			i(".background-image").eq(r).css("background", 'url("' + n + '")'), i(".background-image").eq(r).children("img").hide(), i(".background-image").eq(r).css("background-position", "initial")
		}
		i(".submit").click(function() {
			i("input#name").removeClass("errorForm"), i("textarea#message").removeClass("errorForm"), i("input#email").removeClass("errorForm");
			var e = !1,
				a = i("input#name").val();
			("" == a || " " == a) && (e = !0, i("input#name").addClass("errorForm"));
			var t = i("textarea#message").val();
			("" == t || " " == t) && (e = !0, i("textarea#message").addClass("errorForm"));
			var o = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
				r = i("input#email").val();
			if ("" == r || " " == r ? (i("input#email").addClass("errorForm"), e = !0) : o.test(r) || (i("input#email").addClass("errorForm"), e = !0), 1 == e) return !1;
			var n = i(".contact-form form, .reply-form form, .review-form form").serialize();
			return i.ajax({
				type: "POST",
				url: i(".contact-form form, .reply-form form, .review-form form").attr("action"),
				data: n,
				success: function(e) {
					"SENDING" == e ? i("#success").fadeIn("slow") : i("#error").fadeIn("slow")
				}
			}), !1
		}), e.prototype = {
			initEvents: function() {
				var e = this;
				e.dropdown.on("click", function(e) {
					i(this).toggleClass("active"), e.stopPropagation()
				}), e.opts.children("label").on("click", function() {
					var a = i(this).parent(),
						t = a.children("input"),
						o = t.val(),
						r = a.index(); - 1 !== i.inArray(o, e.val) ? e.val.splice(i.inArray(o, e.val), 1) : e.val.push(o), -1 !== i.inArray(r, e.index) ? e.index.splice(i.inArray(r, e.index), 1) : e.index.push(r)
				})
			},
			getValue: function() {
				return this.val
			},
			getIndex: function() {
				return this.index
			}
		}, i(function() {
			new e(i(".dropdown-holder"))
		}), i(".tabs li").click(function() {
			if (!i(this).hasClass("active")) {
				var e = i(this).index(),
					a = e + 1;
				i(".tabs li.active").removeClass("active"), i(this).addClass("active"), i(".tab li.active").removeClass("active"), i(".tab li:nth-child(" + a + ")").addClass("active")
			}
		}), jQuery.fn.spectragram.accessData = {
			accessToken: "305801553.467ede5.94e8f22591af44eea81bdbd1ca3bff04",
			clientID: "e659391279a64365a13bfb26b4caf15d"
		}, i(".instaFeed").spectragram("getUserFeed", {
			query: "chenman135",
			size: "large",
			max: 12
		}); {
			var s = i(".mobile-btn"),
				l = i("nav.main-nav");
			l.height()
		}
		i(s).click(function(i) {
			i.preventDefault(), l.slideToggle()
		}), i(window).resize(function() {
			var e = i(window).width();
			e > 320 && l.is(":hidden") && l.removeAttr("style")
		})
	})
}(jQuery);