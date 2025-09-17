<script>
// Timeline Toggle Script for 3 buttons with height animation
console.log('Timeline toggle script started');

// Function to initialize timeline
function initTimeline() {
    // Get all buttons and content containers
    var button1 = document.querySelector('.step-button-1');
    var button2 = document.querySelector('.step-button-2');
    var button3 = document.querySelector('.step-button-3');
    
    var content1 = document.querySelector('.content-panel-1');
    var content2 = document.querySelector('.content-panel-2');
    var content3 = document.querySelector('.content-panel-3');
    
    var line1 = document.querySelector('.progress-line-1');
    var line2 = document.querySelector('.progress-line-2');
    
    // Debug logging
    console.log('Button 1 found:', button1);
    console.log('Button 2 found:', button2);
    console.log('Button 3 found:', button3);
    console.log('Content 1 found:', content1);
    console.log('Content 2 found:', content2);
    console.log('Content 3 found:', content3);
    console.log('Line 1 found:', line1);
    console.log('Line 2 found:', line2);
    console.log('GSAP exists:', typeof gsap !== 'undefined');
    
    // Check if all elements exist and GSAP is available
    if (!button1 || !button2 || !button3 || !content1 || !content2 || !content3 || typeof gsap === 'undefined') {
        console.log('Some elements missing or GSAP not loaded, retrying in 500ms...');
        setTimeout(initTimeline, 500);
        return;
    }
    
    console.log('All elements found, setting up timeline...');
    
    // State tracking
    var activeStep = 0;
    
    // Initialize all content panels as collapsed
    gsap.set([content1, content2, content3], {
        height: 0,
        overflow: 'hidden',
        opacity: 0
    });
    
    // Initialize progress lines
    if (line1) gsap.set(line1, { scaleY: 0, transformOrigin: 'top' });
    if (line2) gsap.set(line2, { scaleY: 0, transformOrigin: 'top' });
    
    // Function to handle content toggle
    function toggleContent(contentElement, isVisible, callback) {
        if (isVisible) {
            // Show content with height animation
            gsap.to(contentElement, {
                height: 'auto',
                opacity: 1,
                duration: 0.5,
                ease: 'power2.out',
                onComplete: callback
            });
        } else {
            // Hide content
            gsap.to(contentElement, {
                height: 0,
                opacity: 0,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: callback
            });
        }
    }
    
    // Function to animate progress line
    function animateProgressLine(lineElement, callback) {
        if (lineElement) {
            gsap.to(lineElement, {
                scaleY: 1,
                duration: 3,
                ease: 'power1.inOut',
                onComplete: callback
            });
        } else if (callback) {
            // If no line element, still trigger callback after delay
            setTimeout(callback, 3000);
        }
    }
    
    // Function to handle button clicks with nested elements
    function setupButtonClick(button, stepNumber) {
        // Main button click
        button.addEventListener('click', function(e) {
            console.log('Button ' + stepNumber + ' clicked!');
            e.preventDefault();
            e.stopPropagation();
            
            if (activeStep !== stepNumber) {
                activateStep(stepNumber);
            }
            
            return false;
        });
        
        // Handle nested clickable elements
        var clickableElements = button.querySelectorAll('a, button, [role="button"]');
        console.log('Button ' + stepNumber + ' clickable elements:', clickableElements.length);
        
        for (var i = 0; i < clickableElements.length; i++) {
            clickableElements[i].addEventListener('click', function(e) {
                console.log('Nested element in button ' + stepNumber + ' clicked');
                e.preventDefault();
                e.stopPropagation();
                button.click(); // Trigger main button click
                return false;
            });
        }
    }
    
    // Function to activate a specific step
    function activateStep(stepNumber) {
        console.log('Activating step:', stepNumber);
        
        // Close all other content panels first
        var allContent = [content1, content2, content3];
        var currentContent = allContent[stepNumber - 1];
        
        // Hide other content panels
        allContent.forEach(function(content, index) {
            if (content !== currentContent) {
                toggleContent(content, false);
            }
        });
        
        // Show current content
        toggleContent(currentContent, true, function() {
            console.log('Content ' + stepNumber + ' revealed');
            
            // Start next line animation if not the last step
            if (stepNumber === 1 && line1) {
                animateProgressLine(line1, function() {
                    console.log('Line 1 animation completed');
                });
            } else if (stepNumber === 2 && line2) {
                animateProgressLine(line2, function() {
                    console.log('Line 2 animation completed');
                });
            }
        });
        
        activeStep = stepNumber;
    }
    
    // Setup click handlers for all buttons
    setupButtonClick(button1, 1);
    setupButtonClick(button2, 2);
    setupButtonClick(button3, 3);
    
    console.log('Timeline setup completed successfully!');
    
    // Optional: Auto-start with first step
    // activateStep(1);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTimeline);
} else {
    initTimeline();
}
</script>
