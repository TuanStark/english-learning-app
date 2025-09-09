import { ImageResponse } from 'next/og'

// Image metadata
export const alt = 'English Learning App'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          backgroundImage: 'linear-gradient(45deg, #3B82F6 0%, #8B5CF6 50%, #EC4899 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            padding: '60px',
            borderRadius: '20px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          }}
        >
          <div
            style={{
              width: '120px',
              height: '120px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
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
          <div
            style={{
              fontSize: 48,
              fontWeight: 'bold',
              color: '#1F2937',
              textAlign: 'center',
              marginBottom: '10px',
            }}
          >
            English Learning App
          </div>
          <div
            style={{
              fontSize: 24,
              color: '#6B7280',
              textAlign: 'center',
            }}
          >
            Học Tiếng Anh Hiệu Quả
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
