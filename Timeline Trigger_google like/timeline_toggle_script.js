<script>
// Timeline Toggle Script for 3 buttons with height animation
function initTimeline() {
    var button1 = document.querySelector('.step-button-1');
    var button2 = document.querySelector('.step-button-2');
    var button3 = document.querySelector('.step-button-3');
    
    var content1 = document.querySelector('.content-panel-1');
    var content2 = document.querySelector('.content-panel-2');
    var content3 = document.querySelector('.content-panel-3');
    
    var line1 = document.querySelector('.progress-line-1');
    var line2 = document.querySelector('.progress-line-2');
    
    if (!button1 || !button2 || !button3 || !content1 || !content2 || !content3 || typeof gsap === 'undefined') {
        setTimeout(initTimeline, 500);
        return;
    }
    
    var activeStep = 0;
    var autoTimers = [];
    
    gsap.set([content1, content2, content3], {
        height: 0,
        overflow: 'hidden',
        opacity: 0
    });
    
    // Initially hide buttons 2 and 3
    gsap.set([button2, button3], {
        opacity: 0,
        pointerEvents: 'none'
    });
    
    var line1Separator = line1 ? line1.querySelector('.elementor-divider-separator') : null;
    var line2Separator = line2 ? line2.querySelector('.elementor-divider-separator') : null;
    
    if (line1Separator) gsap.set(line1Separator, { scaleY: 0, transformOrigin: 'top' });
    if (line2Separator) gsap.set(line2Separator, { scaleY: 0, transformOrigin: 'top' });
    
    function clearAllTimers() {
        autoTimers.forEach(function(timer) {
            clearTimeout(timer);
        });
        autoTimers = [];
    }
    
    function setManagedTimeout(callback, delay) {
        var timer = setTimeout(function() {
            var index = autoTimers.indexOf(timer);
            if (index > -1) {
                autoTimers.splice(index, 1);
            }
            callback();
        }, delay);
        autoTimers.push(timer);
        return timer;
    }
    
    function toggleContent(contentElement, isVisible, callback) {
        if (isVisible) {
            gsap.to(contentElement, {
                height: 'auto',
                opacity: 1,
                duration: 0.5,
                ease: 'power2.out',
                onComplete: callback
            });
        } else {
            gsap.to(contentElement, {
                height: 0,
                opacity: 0,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: callback
            });
        }
    }
    
    function animateProgressLine(lineElement, callback) {
        if (lineElement) {
            var separator = lineElement.querySelector('.elementor-divider-separator');
            if (separator) {
                gsap.to(separator, {
                    scaleY: 1,
                    duration: 2,
                    ease: 'power2.inOut',
                    onComplete: callback
                });
            } else {
                if (callback) setTimeout(callback, 2000);
            }
        } else if (callback) {
            setTimeout(callback, 2000);
        }
    }
    
    function activateStep(stepNumber) {
        var allContent = [content1, content2, content3];
        var currentContent = allContent[stepNumber - 1];
        
        allContent.forEach(function(content, index) {
            if (content !== currentContent) {
                toggleContent(content, false);
            }
        });
        
        toggleContent(currentContent, true, function() {
            if (stepNumber === 1 && line1) {
                animateProgressLine(line1, function() {
                    // Show button 2 after line 1 completes
                    gsap.to(button2, {
                        opacity: 1,
                        pointerEvents: 'auto',
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });
            } else if (stepNumber === 2 && line2) {
                animateProgressLine(line2, function() {
                    // Show button 3 after line 2 completes
                    gsap.to(button3, {
                        opacity: 1,
                        pointerEvents: 'auto',
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });
            }
        });
        
        activeStep = stepNumber;
    }
    
    function activateStepWithAuto(stepNumber) {
        activateStep(stepNumber);
        
        if (stepNumber === 1) {
            setManagedTimeout(function() {
                activateStepWithAuto(2);
            }, 4000);
        } else if (stepNumber === 2) {
            setManagedTimeout(function() {
                activateStepWithAuto(3);
            }, 4000);
        }
    }
    
    function setupButtonClickWithAuto(button, stepNumber) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            clearAllTimers();
            activateStepWithAuto(stepNumber);
            return false;
        });
        
        var clickableElements = button.querySelectorAll('a, button, [role="button"]');
        for (var i = 0; i < clickableElements.length; i++) {
            clickableElements[i].addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                button.click();
                return false;
            });
        }
    }
    
    setupButtonClickWithAuto(button1, 1);
    setupButtonClickWithAuto(button2, 2);
    setupButtonClickWithAuto(button3, 3);
    
    setTimeout(function() {
        activateStepWithAuto(1);
    }, 1000);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTimeline);
} else {
    initTimeline();
}
</script>
