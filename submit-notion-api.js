import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_TOKEN, // Vercel 환경변수에 설정
});

export default async function handler(req, res) {
  // CORS 설정
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, category, experience, league } = req.body;

    // 입력값 검증
    if (!name || !email || !phone) {
      return res.status(400).json({ 
        success: false, 
        error: '필수 정보(이름, 이메일, 전화번호)를 모두 입력해주세요.' 
      });
    }

    // 노션 데이터베이스에 페이지 생성
    await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_DATABASE_ID, // 환경변수에 설정
      },
      properties: {
        '이름': {
          title: [{ text: { content: name } }]
        },
        '이메일': {
          email: email
        },
        '전화번호': {
          rich_text: [{ text: { content: phone } }]
        },
        '관심분야': {
          rich_text: [{ text: { content: category || '미입력' } }]
        },
        '아이디어': {
          rich_text: [{ text: { content: experience || '미입력' } }]
        },
        '리그': {
          select: { name: league === 'livescore' ? '라이브스코어' : '하이데어' }
        },
        '신청일': {
          date: { start: new Date().toISOString().split('T')[0] }
        },
        '상태': {
          select: { name: '신규' }
        }
      }
    });

    res.status(200).json({ 
      success: true, 
      message: '신청이 노션 데이터베이스에 성공적으로 저장되었습니다!' 
    });

  } catch (error) {
    console.error('Notion API Error:', error);
    
    // 에러 타입별 메시지
    let errorMessage = '신청 처리 중 오류가 발생했습니다.';
    
    if (error.code === 'unauthorized') {
      errorMessage = 'Notion API 권한이 없습니다. 관리자에게 문의하세요.';
    } else if (error.code === 'object_not_found') {
      errorMessage = 'Notion 데이터베이스를 찾을 수 없습니다.';
    } else if (error.code === 'validation_error') {
      errorMessage = '입력 데이터가 올바르지 않습니다.';
    }
    
    res.status(500).json({ 
      success: false, 
      error: errorMessage
    });
  }
}