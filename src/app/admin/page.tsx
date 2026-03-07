'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';

interface AlbumData {
  groomName: string;
  brideName: string;
  date: string;
  template: string;
  photos: string[];
}

const templates = [
  { id: 'royal', name: 'Royal Palace', color: '#8b2252' },
  { id: 'garden', name: 'Garden Paradise', color: '#2d5a27' },
  { id: 'minimal', name: 'Modern Minimal', color: '#1a1a1a' },
  { id: 'floating', name: 'Floating Gallery', color: '#e8e8e8' },
];

export default function AdminPage() {
  const [groomName, setGroomName] = useState('');
  const [brideName, setBrideName] = useState('');
  const [weddingDate, setWeddingDate] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('royal');
  const [photos, setPhotos] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPhotos: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setPhotos((prev) => [...prev, event.target?.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const generateAlbum = () => {
    setIsGenerating(true);

    // Save album data to localStorage for demo
    const albumData: AlbumData = {
      groomName,
      brideName,
      date: weddingDate,
      template: selectedTemplate,
      photos,
    };

    localStorage.setItem('weddingAlbumData', JSON.stringify(albumData));

    // Redirect to album page
    window.location.href = '/album';
  };

  return (
    <div style={{ minHeight: '100vh', background: '#1a1a1a', color: '#fff', padding: '2rem' }}>
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid #333' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', background: 'linear-gradient(135deg, #d4a574, #c9a227)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            WedVerse Admin
          </h1>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>Create beautiful 3D wedding albums</p>
        </div>
        <Link href="/" style={{ color: '#c9a227', textDecoration: 'none' }}>← Back to Website</Link>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
        {/* Left Side - Form */}
        <div style={{ background: '#252525', padding: '2rem', borderRadius: '20px' }}>
          <h2 style={{ marginBottom: '1.5rem', fontSize: '1.3rem' }}>Wedding Details</h2>

          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {/* Groom Name */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#999' }}>Groom's Name</label>
              <input
                type="text"
                value={groomName}
                onChange={(e) => setGroomName(e.target.value)}
                placeholder="Enter groom's name"
                style={{ width: '100%', padding: '1rem', background: '#333', border: '1px solid #444', borderRadius: '10px', color: '#fff', fontSize: '1rem' }}
              />
            </div>

            {/* Bride Name */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#999' }}>Bride's Name</label>
              <input
                type="text"
                value={brideName}
                onChange={(e) => setBrideName(e.target.value)}
                placeholder="Enter bride's name"
                style={{ width: '100%', padding: '1rem', background: '#333', border: '1px solid #444', borderRadius: '10px', color: '#fff', fontSize: '1rem' }}
              />
            </div>

            {/* Wedding Date */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#999' }}>Wedding Date</label>
              <input
                type="date"
                value={weddingDate}
                onChange={(e) => setWeddingDate(e.target.value)}
                style={{ width: '100%', padding: '1rem', background: '#333', border: '1px solid #444', borderRadius: '10px', color: '#fff', fontSize: '1rem' }}
              />
            </div>

            {/* Template Selection */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#999' }}>Select Template</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                {templates.map((template) => (
                  <div
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    style={{
                      padding: '1rem',
                      background: selectedTemplate === template.id ? template.color : '#333',
                      border: `2px solid ${selectedTemplate === template.id ? '#c9a227' : '#444'}`,
                      borderRadius: '10px',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                    }}
                  >
                    <div style={{ fontWeight: '600' }}>{template.name}</div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Click to select</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Photos */}
        <div style={{ background: '#252525', padding: '2rem', borderRadius: '20px' }}>
          <h2 style={{ marginBottom: '1.5rem', fontSize: '1.3rem' }}>Upload Photos</h2>

          {/* Upload Area */}
          <div
            onClick={() => fileInputRef.current?.click()}
            style={{
              border: '2px dashed #444',
              borderRadius: '15px',
              padding: '3rem',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s',
              marginBottom: '1.5rem',
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📁</div>
            <p style={{ color: '#999' }}>Click to upload photos</p>
            <p style={{ color: '#666', fontSize: '0.8rem', marginTop: '0.5rem' }}>Supports JPG, PNG</p>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handlePhotoUpload}
              style={{ display: 'none' }}
            />
          </div>

          {/* Photo Count */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span style={{ color: '#999' }}>{photos.length} photos uploaded</span>
            {photos.length > 0 && (
              <span style={{ color: '#c9a227' }}>Auto-arranged in gallery</span>
            )}
          </div>

          {/* Photo Grid */}
          {photos.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', maxHeight: '300px', overflowY: 'auto' }}>
              {photos.map((photo, index) => (
                <div key={index} style={{ position: 'relative', aspectRatio: '1' }}>
                  <img
                    src={photo}
                    alt={`Photo ${index + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                  />
                  <button
                    onClick={() => removePhoto(index)}
                    style={{
                      position: 'absolute',
                      top: '5px',
                      right: '5px',
                      background: 'rgba(0,0,0,0.7)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '50%',
                      width: '24px',
                      height: '24px',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Generate Button */}
          <button
            onClick={generateAlbum}
            disabled={!groomName || !brideName || photos.length === 0 || isGenerating}
            style={{
              width: '100%',
              marginTop: '2rem',
              padding: '1.2rem',
              background: groomName && brideName && photos.length > 0
                ? 'linear-gradient(135deg, #d4a574, #c9a227)'
                : '#333',
              border: 'none',
              borderRadius: '10px',
              color: groomName && brideName && photos.length > 0 ? '#fff' : '#666',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: groomName && brideName && photos.length > 0 ? 'pointer' : 'not-allowed',
              transition: 'all 0.3s',
            }}
          >
            {isGenerating ? 'Generating Album...' : '✨ Generate 3D Album'}
          </button>

          <p style={{ textAlign: 'center', marginTop: '1rem', color: '#666', fontSize: '0.8rem' }}>
            Photos will be automatically arranged in beautiful 3D gallery
          </p>
        </div>
      </div>
    </div>
  );
}
