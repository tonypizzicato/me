import $ from 'jquery';

/**
 * Cache
 */
const $content = $('.js-parallax .js-parallax-move');
const $opacity = $('.js-parallax .js-parallax-opacity');

let wHeight = $(window).height();

$(window).on('resize', function () {
    wHeight = $(window).height();
});

/**
 * requestAnimationFrame Shim
 */
window.requestAnimFrame = (() => {
    const w = window;
    return w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.mozRequestAnimationFrame || (cb => w.setTimeout(cb, 1000 / 60));
})();

/**
 * Scroller
 */
class Parallax {

    constructor() {
        this.latestKnownScrollY = 0;
        this.ticking            = false;
    }

    /**
     * Initialize
     */
    init() {
        window.addEventListener('scroll', this.onScroll.bind(this), false);
    }

    /**
     * Capture Scroll
     */
    onScroll() {
        this.latestKnownScrollY = window.scrollY;
        this.requestTick();
    }

    /**
     * Request a Tick
     */
    requestTick() {
        if (!this.ticking) {
            window.requestAnimFrame(this.update.bind(this));
        }
        this.ticking = true;
    }

    /**
     * Update.
     */
    update() {
        var currentScrollY = this.latestKnownScrollY;
        this.ticking       = false;

        /**
         * Do The Dirty Work Here
         */
        const slowScroll = currentScrollY / 5;

        $content.css({
            'transform':         'translateY(' + slowScroll + 'px)',
            '-moz-transform':    'translateY(' + slowScroll + 'px)',
            '-webkit-transform': 'translateY(' + slowScroll + 'px)'
        });

        $opacity.css({
            opacity: 1 - slowScroll / 100
        })
    }
}

export default Parallax;
