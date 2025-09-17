<script>
// Fixed toggle script with correct selectors
console.log('Toggle script started');
var container = document.querySelector('.toggle-content-class');
var button = document.querySelector('.toggle-btn-class');
console.log('Container found:', container);
console.log('Button found:', button);
if (container && button && typeof gsap !== 'undefined') {
    var isVisible = false;
    
    console.log('Button tag:', button.tagName);
    console.log('Setup successful!');
    
    // Add click event to the entire button div
    button.addEventListener('click', function(e) {
        console.log('Button clicked!');
        e.preventDefault();
        e.stopPropagation();
        
        if (isVisible) {
            console.log('Hiding container');
            gsap.to(container, {
                opacity: 0, 
                duration: 0.3,
                onComplete: function() {
                    container.style.visibility = 'hidden';
                }
            });
            isVisible = false;
        } else {
            console.log('Showing container');
            container.style.visibility = 'visible';
            gsap.to(container, {opacity: 1, duration: 0.3});
            isVisible = true;
        }
        
        return false;
    });
    
    // Also try to find any clickable elements inside the button div
    var clickableElements = button.querySelectorAll('a, button, [role="button"]');
    console.log('Clickable elements inside button:', clickableElements);
    
    for (var i = 0; i < clickableElements.length; i++) {
        clickableElements[i].addEventListener('click', function(e) {
            console.log('Clickable element inside button clicked');
            e.preventDefault();
            e.stopPropagation();
            button.click(); // Trigger the main button click
            return false;
        });
    }
    
    console.log('Event listeners added successfully');
} else {
    console.log('Setup failed');
    console.log('Container exists:', !!container);
    console.log('Button exists:', !!button);
    console.log('GSAP exists:', typeof gsap !== 'undefined');
}
</script>
