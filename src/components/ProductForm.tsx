import React, { useState } from 'react';

const ProductForm = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    target_audience: "",
    key_features: [""]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleKeyFeaturesChange = (e, index) => {
    const newKeyFeatures = [...product.key_features];
    newKeyFeatures[index] = e.target.value;
    setProduct({ ...product, key_features: newKeyFeatures });
  };

  const addKeyFeature = () => {
    setProduct({ ...product, key_features: [...product.key_features, ''] });
  };

  const deleteKeyFeature = (index) => {
    setProduct({ ...product, key_features: product.key_features.filter((_, i) => i !== index) });
  };

  return (
    <div style={{
      backgroundColor: '#222',
      color: '#fff',
      padding: '15px',
      borderRadius: '10px',
      maxWidth: '500px',
      margin: '20px auto',
      fontFamily: 'Poppins, sans-serif',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      overflow: 'hidden'
    }}>
      <h3 style={{ textAlign: 'center', fontSize: '18px', marginBottom: '10px' }}>Product Form</h3>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <input type="text" name="name" placeholder="Product Name" value={product.name} onChange={handleChange} 
          style={{ width: '100%', padding: '8px', borderRadius: '6px', border: 'none', fontSize: '14px', boxSizing: 'border-box' }} />
        <textarea name="description" placeholder="Description" value={product.description} onChange={handleChange} 
          style={{ width: '100%', padding: '8px', borderRadius: '6px', border: 'none', fontSize: '14px', boxSizing: 'border-box' }} />
        <input type="text" name="target_audience" placeholder="Target Audience" value={product.target_audience} onChange={handleChange} 
          style={{ width: '100%', padding: '8px', borderRadius: '6px', border: 'none', fontSize: '14px', boxSizing: 'border-box' }} />
        <div>
          {product.key_features.map((feature, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
              <input type="text" value={feature} placeholder='Enter a key feture ' onChange={(e) => handleKeyFeaturesChange(e, index)} 
                style={{ flex: '1', padding: '6px', borderRadius: '6px', border: 'none', fontSize: '14px', boxSizing: 'border-box' }} />
              <button type="button" onClick={() => deleteKeyFeature(index)}
                style={{ marginLeft: '8px', backgroundColor: '#e74c3c', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>
                X
              </button>
            </div>
          ))}
          <button type="button" onClick={addKeyFeature} 
            style={{ width: '100%', backgroundColor: '#ff9800', color: '#fff', border: 'none', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px',marginTop: '10px' }}>
            + Add Feature
          </button>
        </div>
        <button type="submit" style={{ width: '100%', backgroundColor: '#4CAF50', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProductForm;