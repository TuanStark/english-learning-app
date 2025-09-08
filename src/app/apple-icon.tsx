import { ImageResponse } from 'next/og'

// Image metadata
export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'

// Image generation
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f8fafc',
          borderRadius: 40,
        }}
      >
        <img
          src="/images/logo.png"
          alt="English Learning App"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            borderRadius: 40,
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  )
}
