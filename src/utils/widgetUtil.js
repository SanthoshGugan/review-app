export const widgetCarouselTagStr = ({ customer_sid, heading="What Says Customer About Us", font_family = "Times New Roman"}) => 
    `<div id="review-carousel" data-customer-sid="${customer_sid}" data-theme="default" data-heading="${heading}" data-font-famliy="${font_family}"></div>`;

export const widgetAddReviewTagStr = ({ customer_sid, heading, font_family = "Times New Roman"}) => 
    `<div id="postReview" data-customer-sid="${customer_sid}" data-widget-name="review_post"></div>`;

export const widgetCompanyAggregateTagStr = ({ customer_sid, heading, font_family = "Times New Roman"}) => 
    `<div id="rating" data-customer-sid="${customer_sid}" data-widget-name="company_rating"></div>`;