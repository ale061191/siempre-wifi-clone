function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    return null;
}

function delete_cookie(name, domain)
{
  document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/; domain=' + domain;
}

function delete_affiliate_cookies(domain)
{
    delete_cookie('impact_click_id', domain);
    delete_cookie('tapfiliate_ref', domain);
    delete_cookie('tapfiliate_click_id', domain);
}

(function ($) {
    const urlParams = new URLSearchParams(window.location.search);
    const refParam = urlParams.get('ref');
    const irclickid = urlParams.get('irclickid');

    const domain = window.location.hostname.split('.').slice(-2).join('.'); // Extract last two parts of the hostname

    if(irclickid)
    {
        delete_affiliate_cookies(domain);
        document.cookie = `impact_click_id=${irclickid}; expires=${new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).toUTCString()}; path=/; domain=${domain}`;
    }
    else
    {
        if (refParam)
        {
            const referrer = document.referrer;
            const landing_page = window.location.href;
            const user_agent = navigator.userAgent;
            $.ajax({
                type: 'POST',
                url: custom_integrations_ajax_object.ajaxurl,
                data: {
                    action: 'save_ref_param',
                    ref: refParam,
                    referrer: referrer,
                    landing_page: landing_page,
                    user_agent: user_agent
                },
                success: function (response) {
                    const responseObject = JSON.parse(response);
                    if (responseObject.status == 'success')
                    {
                        delete_affiliate_cookies(domain);

                        document.cookie = `tapfiliate_ref=${refParam}; expires=${new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).toUTCString()}; path=/; domain=${domain}`;
                        document.cookie = `tapfiliate_click_id=${responseObject.click_id}; expires=${new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).toUTCString()}; path=/; domain=${domain}`;
                    } else {
                        console.error('Error saving ref parameter');
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    console.error('AJAX Error:', textStatus, errorThrown);
                }
            });
        }
    }
})(jQuery);