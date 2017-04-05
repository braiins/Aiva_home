var $bootLogo = document.querySelector('.boot--logo');
var $bootParticlesGif = $bootLogo.querySelector('.particles');

/**
 * The logo animation goes in particular order,
 * so the stagger* elements must be selected accordingly.
 *
 * 1 | 4 | 3 | 2
 * A | I | V | A
 */
var $bootLogoLetters = ['.a1', '.a2', '.v', '.i'].map(function(x) { return $bootLogo.querySelector(x) });
var $bootLogoSubline = $bootLogo.querySelector('.sub');

var bootTween = new TimelineLite({ paused: true })
    // Letters in
    .staggerTo($bootLogoLetters, 0.6, { autoAlpha: 1, scale: 1 }, 0.2, '+=0.5')

    .add(
        new TimelineLite()
            // Sub-line in
            .to($bootLogoSubline, 3, { autoAlpha: 1, scale: 1 })
            // Restart & show the GIF
            .call(restartGif, [], null, 0.4)
            .to($bootParticlesGif, 2, { autoAlpha: 1 }, 0.5)
    );


/** Boot sequence on content load */
window.addEventListener('load', bootTween.play.bind(bootTween, 0));



/**
 * @desc Restarts GIF by setting it's `src` to empty string and back
 * @param {Element} el
 * @return {undefined}
 */
function restartGif (el) {
    if(!el) return;
    var src = el.src,
        dis = el.style.display;

    // Hide and remove src
    el.style.display = 'none';
    el.src = '';

    // Revert
    el.style.display = dis;
    el.src = src;
}
