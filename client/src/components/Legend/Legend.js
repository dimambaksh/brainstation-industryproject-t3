import "./Legend.scss"

export default function Legend(){
    return(
        <section className="Legend dropShadow">
            <h4 className="centered">Legend</h4>
            <div className="Legend__Flex">
                <div><div className="swatch notAvailable"></div><span>Not Available</span></div>
                <div><div className="swatch available"></div><span>Available</span></div>
                <div><div className="swatch occupied"><div><svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.5 10C20.5 15.224 16.0461 19.5 10.5 19.5C4.95388 19.5 0.5 15.224 0.5 10C0.5 4.776 4.95388 0.5 10.5 0.5C16.0461 0.5 20.5 4.776 20.5 10Z" fill="#F4F5F4" stroke="#001D47"/>
<path d="M14 13.75V12.9167C14 12.4746 13.8156 12.0507 13.4874 11.7382C13.1592 11.4256 12.7141 11.25 12.25 11.25H8.75C8.28587 11.25 7.84075 11.4256 7.51256 11.7382C7.18437 12.0507 7 12.4746 7 12.9167V13.75" stroke="#C3CBCD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.5 9.58333C11.4665 9.58333 12.25 8.83714 12.25 7.91667C12.25 6.99619 11.4665 6.25 10.5 6.25C9.5335 6.25 8.75 6.99619 8.75 7.91667C8.75 8.83714 9.5335 9.58333 10.5 9.58333Z" stroke="#C3CBCD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg></div>
</div><span>Occupied</span></div>
                <div><div className="swatch selected"></div><span>Selected</span></div>
            </div>

        </section>
    )
}