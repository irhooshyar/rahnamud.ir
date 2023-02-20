
function HooshyarAlertShow(alert_header_text, alert_body_text, icon_type) {
    let icon_parent_color = "#FDCECE"
    let icon_color = "#F30C0C"
    if (icon_type === 2)
    {
        icon_parent_color = "#FEEED7"
        icon_color = "#C27605"
    }

    alert_body_text = alert_body_text || '';
    const html_value = `<div class="alert" tabindex="-1" role="dialog" aria-labelledby="HooshyaralertHeader" aria-hidden="true">
      <div class="alert-header">
          <div class="d-flex" style="flex-direction: row-reverse;">
              <div class="icon-parent" style="background: ${icon_parent_color}">
                  <i class="icon-child fa fa-exclamation" style="background: ${icon_color}"></i>
              </div>
              <h5 class="alert-title">
                ${alert_header_text}
              </h5>
          </div>
        <button type="button" class="closeset" aria-label="Close" style="color: #4F4F4F;" onClick=HooshyarAlertClose()>
          <i class="fa fa-remove" ></i>
        </button>
      </div>
      <div class="alert-body">
      ${alert_body_text}
      </div>
      <div class="alert-footer" style="text-align: center; justify-content: center">
        <button type="button" class="btn btn-secondary btn-understand" onClick=HooshyarAlertClose()>متوجه شدم</button>
      </div>
    </div>`

    document.getElementById("HooshyarAlert").innerHTML = html_value
    document.getElementById("HooshyarAlert").style.display = 'flex';
  }

function HooshyarAlertClose() {
  document.getElementById("HooshyarAlert").innerHTML = ""
  document.getElementById("HooshyarAlert").style.display = 'none';
}
