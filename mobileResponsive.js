/**
 *
 **/
'use strict';

var cheerio = require('cheerio');

window.needsMobileAdaptation = function (html) {
  const $ = cheerio.load(html);
  const maxWidth = 700;
  const maxImageWidth = Math.min(maxWidth, 500);
  
  let needsAdaptation = false;

  const checkWidth = (element) => {
    const widthAttr = parseInt($(element).attr('width'), 10);
    const widthStyleAttr = $(element).attr('style');
    const match = widthStyleAttr && widthStyleAttr.match(/width:\s*(\d+)/i);
    const widthVal = widthStyleAttr && !isNaN(parseInt(widthStyleAttr));
    const width = widthVal || (match ? parseInt(match[1]) : widthAttr);
    
    if (width > maxImageWidth) {
      needsAdaptation = true;
    }
  };

  $('img, iframe, video').each(function () {
    checkWidth(this);
  });

  const $tables = $('table[width]');
  const isWide = $tables.length > 0 || needsAdaptation;

  const hasViewportMetaTag = $('meta[name="viewport"]').length > 0;

  const needsMobileAdaptation = isWide || !hasViewportMetaTag;
  
  return needsMobileAdaptation;
};


const adjustTextLength = function (html, screenWidth) {
  const $ = cheerio1.load(html);

  $('table').each((i, table) => {
    $(table).removeAttr('width');
  });

  $('img').each((i, img) => {
    $(img).removeAttr('width');
    $(img).removeAttr('height');
    $(img).removeAttr('style');
    $(img).addClass('img-fluid');
  });

  $('iframe').each((i, iframe) => {
    $(iframe).removeAttr('width');
    $(iframe).removeAttr('height');
    $(iframe).addClass('embed-responsive-item');
  });

  $('video').each((i, video) => {
    $(video).removeAttr('width');
    $(video).removeAttr('height');
    $(video).addClass('video-fluid');
  });

  // Apply CSS styles for text truncation to p, span elements
  $('p, span').each((i, element) => {
    $(element).css({
      'text-overflow': 'ellipsis', // Use an ellipsis for overflowed text
      'overflow': 'hidden',       // Hide the overflowed text
      'white-space': 'nowrap',    // Prevent text from wrapping to the next line
    });
  });

  // Allow text wrapping in table cells
  $('td, th').each((i, element) => {
    $(element).css({
      'white-space': 'normal',    // Allow text to wrap to the next line
    });
  });

  // Create a <style> tag with your CSS
  const css = `
  .img-fluid {
    max-width: 100%;
    height: auto;
  }
  .embed-responsive-item {
    /* Styles for responsive iframes */
  }
  .video-fluid {
    /* Styles for responsive videos */
  }
  `;

  // Add the <style> tag to the <head> of the document
  $('head').append(`<style>${css}</style>`);

  return $.html();
};

const convertTables = function ($) {
  $('table').each((_, table) => {
    const $table = $(table);

    // Remove width attributes from table and td elements, they will be controlled via CSS
    $table.removeAttr('width');
    $('td', $table).removeAttr('width');

    // Apply responsive table CSS
    $table.css({
      'width': '100%',        // Set table width to 100%
      'table-layout': 'auto', // Let the browser automatically set the column widths for optimal readability
      'overflow-x': 'auto',   // Add horizontal scroll when needed
    });

    // Wrap the table in a div to control overflow, if it isn't already inside a div
    if (!$table.parent().is('div')) {
      $table.wrap('<div style="overflow-x: auto;"></div>');
    }

    // Handle images inside tables
    $('img', $table).each((_, img) => {
      const $img = $(img);
      // Apply CSS to ensure images are responsive and fits within its parent <td>
      $img.css({
        'max-width': '100%',
        'height': 'auto',
      });
    });

    // Set alignment of tables
    const align = $table.attr('align');
    if (align === 'left' || align === 'right') {
      $table.parent().css({
        'display': 'flex',
        'justify-content': align === 'left' ? 'flex-start' : 'flex-end',
      });
      $table.removeAttr('align');
    }
  });
};

const adjustImageSize = function (image, $) {
  const currentWidthAttr = $(image).attr('width');
  const currentWidthStyle = $(image).css('width');
  const currentWidth = parseInt(currentWidthAttr || currentWidthStyle, 10);
  const currentHeight = parseInt($(image).attr('height'), 10);
  const maxWidth = 700; // Use screen width as max width and subtract 20px for padding/margin

  if (currentWidth && currentWidth > maxWidth) {
    // Scale image down to fit screen width while maintaining aspect ratio
    const aspectRatio = currentHeight / currentWidth;
    const newWidth = maxWidth;
    const newHeight = Math.floor(newWidth * aspectRatio);
    
    // If width is set in inline style, update it
    if (currentWidthStyle) {
      $(image).css('width', newWidth);
      $(image).css('height', newHeight);
    } else {
      // If width is set in width attribute, update it
      $(image).attr('width', newWidth);
      $(image).attr('height', newHeight);
    }
  }
};

const adjustVideoSize = function (video, $) {
  const currentWidth = parseInt($(video).attr('width'), 10);
  const currentHeight = parseInt($(video).attr('height'), 10);
  const maxWidth = 700 // Use screen width as max width and subtract 20px for padding/margin

  if (currentWidth && currentWidth > maxWidth) {
    // Scale video down to fit screen width while maintaining aspect ratio
    const aspectRatio = currentHeight / currentWidth;
    const newWidth = maxWidth;
    const newHeight = Math.floor(newWidth * aspectRatio);
    $(video).attr('width', newWidth);
    $(video).attr('height', newHeight);
  }
};

// Function to replace &amp; in URLs with &
function unescapeAmpersands(html) {
  return html.replace(/(href|src)="\s*([^"]*?)\s*&amp;\s*([^"]*?)\s*"/g, '$1="$2&$3"');
}

exports.convertToMobileDisplay = function (html) {
    const steps = {step1: Date.now()};
  
    console.log('start');
//   if (needsMobileAdaptation(html) === false) {
//   return html;
//   }

  const $ = cheerio.load(html);

  steps['step2'] = Date.now();
  console.log('cheerio.load done: ' + (steps['step2'] - steps['step1']));

  // Set viewport meta tag to ensure proper scaling
  $('head').append('<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=wide">');

  steps['step3'] = Date.now();
  console.log('After append: ' + (steps['step3'] - steps['step2']));
 
  // Pass Cheerio instance to the conversion functions
  convertTables($);

  steps['step4'] = Date.now();
  console.log('After convert tables: ' + (steps['step4'] - steps['step3']));

  // Handle image conversion with aspect ratio preservation
  $('img').each((index, element) => {
    adjustImageSize(element, $);
    $(element).css({
      'max-width': '100%',
      height: 'auto',
      display: 'block',
    });
  });
  steps['step5'] = Date.now();
  console.log('After img processing: ' + (steps['step5'] - steps['step4']));

  $('video').each((i, video) => adjustVideoSize($(video), $));

  steps['step6'] = Date.now();
  console.log('After video processing: ' + (steps['step6'] - steps['step5']));

  $('body *').each((i, element) => {
    // console.log(i);
    const baseFontSize = parseFloat($('html').css('font-size'));
    const currentFontSize = parseFloat($(element).css('font-size'));
    const newFontSize = currentFontSize * (baseFontSize / baseFontSize);
    if (!isNaN(newFontSize)) {
      $(element).css('font-size', `${newFontSize}px`);
    }
  });

  steps['step7'] = Date.now();
  console.log('After body processing: ' + (steps['step7'] - steps['step6']));

  // Retain styles such as background color, color, and border-radius
  $('[style]').each((i, element) => {
    const style = $(element).attr('style').toLowerCase();
    if (style.includes('background-color') || style.includes('color') || style.includes('border-radius')) {
      $(element).attr('style', style);
    }
  });

  steps['step8'] = Date.now();
  console.log('After styles processing: ' + (steps['step8'] - steps['step7']));

  const mobileFriendlyHtml = $.html();

  steps['step9'] = Date.now();
  console.log('After html generate: ' + (steps['step9'] - steps['step8']));

  const finalHtml = unescapeAmpersands(mobileFriendlyHtml); // Use the unescapeAmpersands function
  steps['step10'] = Date.now();
  console.log('After html unescapeAmpersands: ' + (steps['step10'] - steps['step9']));
  return finalHtml;
    };
