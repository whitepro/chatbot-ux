(function(){
    // var socket = io.connect();
    $(function() {
        const windowHeight = $( window ).height();
        const docHeight = $(document).height();
        if(docHeight <= windowHeight) {
            $(".scroll-btn").addClass("hide");
        }

        //detect interest item Click
        $('.card').on('click', function(e) {
            if(!($(this).find('div.overlay').hasClass("overlay-active"))) {
                $(this).find('div.overlay').addClass("overlay-active");
            } else {
                $(this).find('div.overlay').removeClass("overlay-active");
            }
        });

        //on click "submit" button
        $('.submit').on('click', function(){
            location.href = '/bot/enroll/success';
        });

        // scrolling to next position
        $(".scroll-btn").on("click", function(e) {
          e.preventDefault();
          let scrollBtnPos = $(".scroll-btn").offset().top;
          $([document.documentElement, document.body]).animate(
            {
              scrollTop: scrollBtnPos - 200
            },
            500
          );
        });

        // hide scroll button when reached bottom
        $(window).on("scroll", function(){
            let nextBtn = $(".submit").offset().top;
            let scrollBtn = $(".scroll-btn").offset().top;
            if(scrollBtn > nextBtn){
                $(".scroll-btn").addClass("hide");
            }
        })
    })
})();
