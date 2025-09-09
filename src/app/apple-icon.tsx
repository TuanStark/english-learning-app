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
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#3B82F6',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '48px',
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          E
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
