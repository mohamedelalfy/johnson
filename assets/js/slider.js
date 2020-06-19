$.fn.slider = function(configuration) {
    const settings = $.extend( {}, {
      selector: {
        slides: '.slides',
        slide: '.slide'
      }
    }, configuration);
    return this.each(function() {
      const slider = $(this);
      const config = {
        direction: $(slider).closest('[dir]')[0].getAttribute('dir'),
        minScale: 0.6,
        minOpacity: 0.24
      };
      function setSlideCSS(element, index, type) {
        element.style.zIndex = ([...$(settings.selector.slide, slider)].length - index);
        element.style.opacity = (1 - (((1 - config.minOpacity) / ([...$(settings.selector.slide, slider)].length - 1)) * index));
        element.style.transform = `scale(${(1 - (((1 - config.minScale) / ([...$(settings.selector.slide, slider)].length - 1)) * index))})`;
        switch(type) {
          case 'next':
            element.style[config.direction === 'ltr' ? 'right' : 'left'] = `${(33.33 - ((33.33 / ([...$(settings.selector.slide, slider)].length - 1)) * index))}%`;
            break;
          case 'previous':
            element.style[config.direction === 'ltr' ? 'right' : 'left'] = `${(((33.33 / ([...$(settings.selector.slide, slider)].length - 1)) * index) + 33.33)}%`;
            break;
          default:
            element.style[config.direction === 'ltr' ? 'right' : 'left'] = 'unset';
        }
      }
      function activeSlide(index) {
        $(settings.selector.slide, slider).each(function() {
          $(this).removeClass('status--active');
        });
        $([...$(settings.selector.slide, slider)][index]).addClass('status--active');
        setSlideCSS($([...$(settings.selector.slide, slider)][index])[0], 0, '');
        for(let i = 0, level = index;i < index;i++, level--) {
          setSlideCSS($([...$(settings.selector.slide, slider)][i])[0], level, 'next');
        }
        for(let i = index+1, level = 1;i < [...$(settings.selector.slide, slider)].length;i++, level++) {
          setSlideCSS($([...$(settings.selector.slide, slider)][i])[0], level, 'previous');
        }
      }
      function nextSlide() {
        const index = $([...$(settings.selector.slide, slider)].filter(slide => $(slide).hasClass('status--active'))).index() + 1;
        if (index < [...$(settings.selector.slide, slider)].length) {
          activeSlide(index);
        }
      }
      function previousSlide() {
        const index = $([...$(settings.selector.slide, slider)].filter(slide => $(slide).hasClass('status--active'))).index() - 1;
        if (index >= 0) {
          activeSlide(index);
        }
      }
      if ([...$(settings.selector.slide, slider)].filter(slide => $(slide).hasClass('status--active')).length !== 1) {
        activeSlide(0);
      } else {
        activeSlide($([...$(settings.selector.slide, slider)].filter(slide => $(slide).hasClass('status--active'))).index());
      }
      $('.type--next', slider).on('click', function() {
        nextSlide();
      });
      $('.type--previous', slider).on('click', function() {
        previousSlide();
      });
    });
  };
