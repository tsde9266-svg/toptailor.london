// Fires the Google Ads conversion + GTM dataLayer event for a lead.
// Call this synchronously at the moment the customer hits submit — before any
// network request or WhatsApp hand-off — so the event is never lost to a
// redirect, tab switch, or failed API call.
export function trackLead(formName: 'booking_form' | 'checkout') {
  if (typeof window === 'undefined') return
  const w = window as any
  if (w.gtag) {
    w.gtag('event', 'conversion', {
      send_to: 'AW-18127638127/SsX4CLuIgqUcEO-c98ND',
    })
  }
  w.dataLayer = w.dataLayer || []
  w.dataLayer.push({ event: 'lead_submitted', form_name: formName })
}
