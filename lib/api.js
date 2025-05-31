export async function followUser(userId) {
    const res = await fetch(`/api/user/followunfollow?followingId=${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) {
        throw new Error(`Failed to follow: ${res.statusText}`);
    }
    return res.json();
}

export async function checkFollow(userId) {
    const res = await fetch(`/api/user/checkfollow?followingId=${userId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) {
        throw new Error(`Failed to check: ${res.statusText}`);
    }
    return res.json();
}

export async function getMyFollowings(){
    const res = await fetch('/api/user/getmyfollowings', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) {
        throw new Error(`Failed to fetch profile: ${res.statusText}`);
    }
    return res.json();
}

export async function getAllBlogs(pageno, totalblogsonpage, query) {
    const res = await fetch(`/api/blog/allblogs?pageno=${pageno}&totalblogsonpage=${totalblogsonpage}&query=${query}`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json'},
    });
    if (!res.ok) {
        throw new Error(`Failed to fetch blogs: ${res.statusText}`);
    }
    return res.json()
}

export async function searchProfiles(pageno,query){
    const res=await fetch(`/api/user/searchprofile?pageno=${pageno}&query=${query}`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json'}
    });
    if (!res.ok) {
        throw new Error(`Failed to fetch profile: ${res.statusText}`);
    }
    return res.json()
}

export async function deleteBlogApi(selectedId) {
    const res = await fetch(`/api/blog/deleteblog?id=${selectedId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (!res.ok) {
        throw new Error(`Failed to delete: ${res.statusText}`);
    }
    return res.json()
}

export async function getMyBlogsApi(pageno,id){
    const res = await fetch(`/api/blog/myBlogs?pageno=${pageno}&id=${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (!res.ok) {
        throw new Error(`Failed to fetch blogs: ${res.statusText}`);
    }
    return res.json();
}

export async function homePageSectionApi(){
    const res = await fetch(`/api/blog/home/main/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (!res.ok) {
        throw new Error(`Failed to fetch blogs: ${res.statusText}`);
    }
    return res.json()
}