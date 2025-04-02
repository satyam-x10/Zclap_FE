import React, { useState } from "react";
import "./App.css";
import ConversationTable from "./components/ConversationTable";
import ProductForm from "./components/ProductForm";
import AgentsForm from "./components/AgentForm";

const API_URL = import.meta.env.VITE_API_URL;


function App() {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    target_audience: "",
    key_features: [""],
  });
  const [data1, setData1] = useState([
    {
      sno: 1,
      agent: "Content Writer",
      message:
        "Team, we need to create a marketing campaign for the {product_info.name} product launch. Let's collaborate on ideas.",
      model: "gemma2-9b-it",
    },
    {
      sno: 2,
      agent: "Content Writer",
      message:
        "Farmers and cultural activists are motivated by different things. \n\n**For farmers:**\n\n* **Focus on tangible benefits:**  Highlight increased yield, improved fruit quality, and cost savings compared to chemical fertilizers.\n* **Use data and case studies:**  Quantify the product's impact with real-world examples from other mango plantations.\n* **Emphasize ease of use:**  Showcase how simple it is to make and apply the manure, saving time and effort.\n\n**For cultural activists:**\n\n* **Connect to environmental values:**  Promote the eco-friendly nature of the product and its contribution to sustainable farming practices. \n* **Tell a story:** Weave a narrative about preserving traditional farming methods and biodiversity.\n* **Highlight social impact:**  Showcase how supporting this product helps local farmers and strengthens the community.\n\n\nLet's tailor our message to resonate with both audiences!  \n\n",
      model: "gemma2-9b-it",
    },
    {
      sno: 3,
      agent: "Graphic Designer",
      message:
        "As a Graphic Designer, I'd suggest creating a logo that incorporates elements of nature, such as leaves or mango trees, to convey the eco-friendly aspect of the manure company. A color palette of earthy tones like green, brown, and yellow can evoke feelings of sustainability and warmth. \n\nFor the marketing campaign, I'd recommend using imagery that showcases the contrast between chemical-laden farming and the lush, vibrant mango plantations that use our product. Infographics highlighting the benefits, such as increased yield and cost savings, can be effective for farmers. For cultural activists, we can use illustrations or photographs that tell a story of traditional farming methods and community involvement. \n\nThe visual identity should be simple, yet distinctive, to resonate with both audiences and reflect the values of the product.",
      model: "llama-3.3-70b-versatile",
    },
    {
      sno: 4,
      agent: "SEO Specialist",
      message: "[Error getting response from SEO Specialist]",
      model: "whisper-large-v3",
    },
    {
      sno: 5,
      agent: "Marketing Strategist",
      message: "[Error getting response from Marketing Strategist]",
      model: "distil-whisper-large-v3-en",
    },
    {
      sno: 6,
      agent: "Web Developer",
      message:
        "Okay, as a Web Developer, here's my input on the campaign:\n\n*   **Website Landing Pages:** We need *two* distinct landing pages, one tailored for farmers and one for cultural activists. The farmer page should prominently feature data, case studies, and ease-of-use guides (perhaps short videos). The activist page should emphasize the eco-friendly aspects, the story of sustainable farming, and community impact with powerful visuals.\n\n*   **Mobile Optimization is Key:** Ensure both landing pages, and any supporting web content, are fully optimized for mobile viewing. Farmers and activists alike will likely be accessing information on their smartphones in the field or at community events.\n\n*   **Interactive Elements:** For the farmer landing page, consider a yield calculator where they can input their current results vs. projected results with the manure. For the cultural activist page, perhaps an interactive map showcasing community farms using the product.\n\n*   **Accessibility:** Make sure the website and all content meet accessibility standards (WCAG).\n\n*   **Fast Loading Times:** Site speed is critical, especially in rural areas with potentially slower internet connections. Optimize images and code for the fastest possible loading experience.",
      model: "gemini-2.0-flash",
    },
    {
      sno: 7,
      agent: "Social Media Manager",
      message:
        "As the Social Media Manager, I think it's crucial to establish a strong presence on platforms where both farmers and cultural activists are active.  \n\n* **Visual-heavy Platforms:**  Instagram and Facebook will be great for showcasing the Graphic Designer's aesthetic with before-and-after images of mango plantations using the manure. Short, engaging videos demonstrating its ease of use can be impactful.\n\n* **Community Building:** Twitter and relevant forums could be used to engage in conversations about sustainable farming practices and connect with cultural activists interested in promoting eco-friendly products.\n\n* **Content Strategy:** We need to create a mix of content that speaks to both audiences. This can include: \n    *  Farmers:  Data-driven posts about increased yields, infographics comparing costs, and testimonials from other farmers. \n    *  Cultural Activists: Posts highlighting the environmental benefits, stories of local farmers preserving traditions, and calls to action to support sustainable agriculture.\n\n\nLet's leverage social media to build a community around the brand and its values!  \n\n",
      model: "gemma2-9b-it",
    },
    {
      sno: 8,
      agent: "UX Designer",
      message: "[Error getting response from UX Designer]",
      model: "distil-whisper-large-v3-en",
    },
    {
      sno: 9,
      agent: "Data Analyst",
      message:
        "As a Data Analyst, I recommend incorporating A/B testing into the campaign's design.  \n\n* **Website:** Test different headlines, calls to action, and imagery on the landing pages to see what resonates best with each target audience.\n* **Social Media:** Experiment with different types of content (videos, infographics, stories) and posting times to optimize engagement. \n\nBy analyzing the data from these tests, we can continuously refine the campaign and maximize its impact. \n",
      model: "gemma2-9b-it",
    },
    {
      sno: 10,
      agent: "Content Writer",
      message:
        "I like the direction everyone is taking! \n\nMy focus as the Content Writer will be on crafting compelling copy that speaks directly to each target audience.  I'll ensure the farmer-centric messaging is clear, concise, and benefit-driven, while the activist-focused content is emotionally resonant and values-aligned.  Storytelling will be key for both groups, but the narratives will be tailored to their respective motivations.  \n\n",
      model: "gemma2-9b-it",
    },
    {
      sno: 11,
      agent: "Graphic Designer",
      message:
        "As the Graphic Designer, I'd like to build upon my previous suggestions. To further enhance the visual identity, I recommend:\n\n* Developing a custom icon set that incorporates mango elements and eco-friendly symbols to use across the website and social media platforms.\n* Creating a consistent typography system that reflects the brand's values and is legible on various devices.\n* Designing a pattern or texture that evokes the natural, earthy feel of the product to use as a background or accent element.\n\nThese visual elements will help create a cohesive and recognizable brand identity that resonates with both farmers and cultural activists.",
      model: "llama-3.3-70b-versatile",
    },
    {
      sno: 12,
      agent: "SEO Specialist",
      message: "[Error getting response from SEO Specialist]",
      model: "whisper-large-v3",
    },
    {
      sno: 13,
      agent: "Marketing Strategist",
      message: "[Error getting response from Marketing Strategist]",
      model: "distil-whisper-large-v3-en",
    },
    {
      sno: 14,
      agent: "Web Developer",
      message:
        "Okay, building on everyone's suggestions, here are my web development considerations:\n\n*   **Backend System for Case Studies/Data:** We need a robust and easily updatable backend system to manage case studies, yield data, and farmer testimonials. This will allow the content writer and marketing team to keep the farmer landing page fresh and compelling.\n*   **CRM Integration:** Integrating a CRM will allow us to capture leads from both landing pages (farmers and activists) and segment them for targeted email marketing campaigns.\n*   **Multilingual Support:** Depending on the region, consider adding multilingual support to the website to cater to a wider audience.\n*   **Analytics Dashboard:** Set up a comprehensive analytics dashboard to track website traffic, conversion rates, and user behavior on both landing pages. This will provide valuable insights for optimizing the campaign in real-time.\n*   **Security:** Implement proper security measures to protect user data and prevent website vulnerabilities.\n\nThese are essential to ensure a successful digital presence for the manure company and its campaign.",
      model: "gemini-2.0-flash",
    },
    {
      sno: 15,
      agent: "Social Media Manager",
      message:
        "As Social Media Manager, I see a fantastic opportunity to build a community around this product. \n\nBeyond posting to platforms like Instagram and Facebook,  we can leverage user-generated content. Encourage farmers to share their experiences using the manure, and potentially run contests or offer incentives for the best before-and-after photos. \nThis fosters engagement, builds trust, and amplifies our reach organically. \n\n",
      model: "gemma2-9b-it",
    },
    {
      sno: 16,
      agent: "UX Designer",
      message: "[Error getting response from UX Designer]",
      model: "distil-whisper-large-v3-en",
    },
    {
      sno: 17,
      agent: "Data Analyst",
      message:
        "As Data Analyst, I believe real-time campaign performance tracking is vital. We need to monitor key metrics like website traffic, conversion rates from landing pages to purchase, and social media engagement. This data will pinpoint what resonates with each audience and allow us to adjust our strategies for maximum impact. Continuous iteration based on data-driven insights will be key to campaign success. \n\n\n\n",
      model: "gemma2-9b-it",
    },
  ]);
  const [data, setData] = useState(null);

  const [agents, setAgents] = useState([]);

  const handleGenerateContent = async () => {
    if (
      loading ||
      agents.length == 0 ||
      !product.name ||
      !product.target_audience
    ) {
      alert("Please fill in all fields and select at least one agent.");
      return;
    }

    setLoading(true);
    try {
      console.log("Sending data to backend:", { product, agents });

      const response = await fetch(`${API_URL}/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product: product,
          agents: agents,
        }),
      });

      const res = await response.json();
      const conversationObj = JSON.parse(res.content);
      const conversation = conversationObj.conversation;
      console.log("Response from backend:", conversation);
      setData(conversation);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error sending data to backend:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: "100px" }}>
      {data ? (
        <ConversationTable
          data={data}
          loading={loading}
          setLoading={setLoading}
        />
      ) : (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100vw",
              // height: '100%',
              gap: "20px",
              padding: "10px",
              boxSizing: "border-box",
              backgroundColor: "#000",
            }}
          >
            <div
              style={{ width: "40%", maxHeight: "65vh",minHeight:'65vh', overflowY: "scroll" }}
            >
              <ProductForm product={product} setProduct={setProduct} />
            </div>
            <div
              style={{ width: "60%", maxHeight: "65vh",minHeight:'65vh', overflowY: "scroll" }}
            >
              <AgentsForm agents={agents} setAgents={setAgents} />
            </div>
            {/* <button onClick={handleGenerateContent}>
          Generate Content
        </button> */}
          </div>
          <>
            Please make sure that you have filled product and agents data
            carefully .
          </>

          <button
            onClick={handleGenerateContent}
            style={{
              width: "100%",
              backgroundColor: loading ? "#ccc" : "#007bff",
              color: "#fff",
              border: "none",
              padding: "10px",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              maxWidth: "200px",
              // shift right
              marginLeft: "auto",
              marginTop: "20px",
              boxSizing: "border-box",
            }}
            disabled={loading}
          >
            {loading ? (
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  backgroundColor: "#007bff",
                  border: "2px solid #fff",
                  borderTop: "2px solid transparent",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                }}
              ></div>
            ) : (
              "Submit"
            )}
          </button>

          <style>
            {`
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `}
          </style>
        </>
      )}
    </div>
  );
}

export default App;
