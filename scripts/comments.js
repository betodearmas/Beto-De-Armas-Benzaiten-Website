const SUPABASE_URL = 'https://noaewfpgxhbpkxxucrdj.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vYWV3ZnBneGhicGt4eHVjcmRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyMzMwNjUsImV4cCI6MjA5NjgwOTA2NX0.L7-NfXEanaXaGNtOgK0EN96URG4tip5C1wyhaw760uo';

async function fetchComments(articleId) {
    const res = await fetch(
        `${SUPABASE_URL}/rest/v1/comments?article_id=eq.${articleId}&order=created_at.desc`,
        { headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` } }
    );
    return res.json();
}

async function postComment(articleId, name, body) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/comments`, {
        method: 'POST',
        headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
            Prefer: 'return=representation'
        },
        body: JSON.stringify({ article_id: articleId, name, body })
    });
    if (!res.ok) throw new Error('Failed to post comment');
    return res.json();
}

function formatDate(iso) {
    return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function renderComments(comments) {
    const list = document.getElementById('comments-list');
    if (!list) return;
    if (comments.length === 0) {
        list.innerHTML = '<p class="no-comments">No comments yet. Be the first.</p>';
        return;
    }
    list.innerHTML = comments.map(c => `
        <div class="comment">
            <div class="comment-meta">
                <span class="comment-name">${escapeHtml(c.name)}</span>
                <span class="comment-date">${formatDate(c.created_at)}</span>
            </div>
            <p class="comment-body">${escapeHtml(c.body)}</p>
        </div>
    `).join('');
}

function escapeHtml(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

async function initComments(articleId) {
    const comments = await fetchComments(articleId);
    renderComments(comments);

    const form = document.querySelector('.comments-form');
    const submitBtn = document.getElementById('submitbutton');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const comment = document.getElementById('comment').value.trim();
        if (!name || !comment) return;

        submitBtn.disabled = true;
        submitBtn.textContent = 'Posting...';

        try {
            await postComment(articleId, name, comment);
            form.reset();
            const updated = await fetchComments(articleId);
            renderComments(updated);
        } catch {
            alert('Could not post comment. Please try again.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = submitBtn.dataset.i18n ?
                (localStorage.getItem('lang') === 'jp' ? '送信' : 'Submit') : 'Submit';
        }
    });
}
