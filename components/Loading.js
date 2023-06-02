import React from 'react'
import Image from 'next/image'
import Spinner from "react-spinkit";

function Loading() {
  return (
    <center style={{
      display: "grid",
      placeItems: "center",
      height: "95vh",
    }}>
      <div>
        <Image
          src="/../public/images/chat.png"
          alt="Loading..."
          height={200}
          style={{
            marginBottom: 50,
          }}
          width={200}
        />
        <Spinner
          name="ball-spin-fade-loader"
          color="orange"
          fadeIn="none"
          style={{
            marginLeft: 100,
          }}
        />
      </div>
    </center>
  )
}

export default Loading