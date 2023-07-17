const encoded_sounds = {
    click: `UklGRlQAAABXQVZFZm10IBAAAAABAAEAESsAABErAAABAAgAZGF0YTAAAACLcnGbdHGZdnGWeXGUenGTe3CTe3CUenCVeHCXdnGWdXaQdoSCeIh9eYd8foN+gH8=`,
    msg: `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`,
    bigMsg: `UklGRlQTAABXQVZFZm10IBAAAAABAAEAiBUAABArAAACABAAZGF0YTATAAABB/4YAzb9UANn/XYDf/1+A3f9ZgNR/DUEGP73Adj/uv+hApAAhACA/4MBkP6hA7v+1wH3ABf/NAFP/2QBdP97AXz/cwFl/04ANQEX//YA2QG8/qMCkv6GA4P8hgWT+qQEvf/Y//YCFv4zAU4AY/9wAXn/eAJx/mECTf0yBBb89gLaAb79pgSV/IkChgCKAJUApwC/ANr/9wIWADP+SwFgAG8AdgF2/23/XwJL/zEAFQH4/tkCv/6oBJf6jAaJ+owGmPupBMD92gL4/xT/MANK/V0CbP5yA3P8agNd/0j/LwIV/vcB2wDB/6oBmgCQAIz/jwGb/qsFwvrbBPj/FP4vBEj8WwRp/G8EcPtoBFv/Rv8uABQA+AHc/8IBrf6cAZIBjwCTAJ3/rQDEAt3/+AAUAC//RQJZAGb+bAJt/2UAWAFF/i0DE/33BN37wwSv/p4Clf6RAZb/nwGwAMUA3v/4AhT8LQZE+VYHZPppBWr9YgFWAUP9LAMT//f/3QLG/rAAogGY/5QCmf2iA7L+xgHfAfn8EgUs/EEFVPlgB2f5Zghg+FIHQfsqBBP8+ATf+8cGtPukBJv8lwOc/qQAtQHI/98B+QAT/ioCQP9RAl79YwJk/1wBUf8/Ayr6EQb5+98Eyf61Aaf+nQKb/54AqAK3/MkF4fv4BBL9KAQ++04FW/1gAWEAWwFP/T0FKfsRA/n/4P/KArj9qQSh/J0Eof2pAbkBy/7gA/n+EAEo/zsATQJY/l0CXvxXBUz9OwMo/BAC+gDiAM0Bu/6sAaQAof+jAq3/uv/MAuL9+AQQ/SUBOgBKAVX+WgNb/FQDSv85ASf9EAT6/OMEz/y8BLD9pgGlAqf7rwa9+s0F4/74AQ/+JAI4/kYDUv1XA1j9UgJI/zgAJgER//oA5QDRAsD9sgSr/KcCqgCyAL8B0P7iAfkADv8iAzb8RARP/VQBVQFQ/UUFN/okBBH/+v/lAdP/wQC2Aa7/qgGt/rQCwf3QBOT99wMN/SACM/9BAEwDUvxRBU36QgU1/CMEEf37AegB1fzEBbn7sAWu/a//tgPD/NEF5Pz3Agz/HwAxAD8BSQBP/04BSv9AATT/IgIR/fwD6f7WAcgAvAC0/7ACs/65AcUB0/7kA/j9CgEeAC4BPP5FA0v7SwVI/T4BMgEj/RAC/gDr/9gCyv6+Arf9swS2+7sFx/3UAeUB9/wJBRz8KwM5/kIASAJJ/UQEPfwwAiIAEf/9Auz92wPN/cEDuv22BLn7vgXI/NUE5v32Agn+GQEpATb/PwBFAEYAQgA7AS/+IAERAP8B7v7dAtD+xAG+Abr9uwTB+skH1/rlBPb9BwIY/SYFNPo8B0L5QwVA/TgCLwAh/hADAP3uAd8B0v7GAr//uwC8/8ACyv/VAOUA9QEG/xYBJgAz/jsEQv1CAUD/OAIv/iECEv4AAfEB4f3SA8j+vwK8AL39wAPK/tUD5P7zAAUBFv4kAjEAO/82ARr+7QPP/cMDyv3dAfoCF/0uAzv8NwMn/wwB8P/VAcf9xAXS++kEB/0iAjUAO/4wAxz8/wTj/839xATK/NwF9/sTBCz9OAE3ASj+DgLz/9j/yAHGANIA6AAF/x8BMwA5/zECHv4BAub/0ADH/8oD2/z0BRH7KAQ3/jYAKQASAPYB3P/KAcf+0AHnAQL+GwEwADj/MAIf/QQE6vrTB8n6ygba+/IDDv4lAjT/NQAqABT/+ALf/83/yALR/uQA/wMZ+ywFNv0wAiD+BwLt/tYCy/7LA9r97wML/CEDMf4zAir+FAH8/+IB0f/KAdL/4wD8ARb/KQAzATD+IAEKAfD92gTO/MwD2f/t/wcDH/wtBDL9KQEXAP8A5wHV/cwD0v7hAvr+EQEmADD/LgIi/QsD9P/d/9ACz/7YAu3/AwEb/ioCMP8oABgAAQHq/dcD0P/S/+EC9/4OASIALQAtACIADv/2AOIC1P7QAdoA6/0BBRf9JgAtAij9GAME/u0C3P3SA9X+4AD1AQv/HgEq/yoAIgEQ//kA5gDYANQA2gLq/f4BFAEk/ioCJ/8Z/wUD8f7fANYA1//gA/P8BwMb/SYCKf8gAhH9/AHpAdz91gXc/OgD/fwPBCD+JgElABr+BwL0/+IB2f/YAOIB8v4EARcAIwAmACAAEgD//uwD3/3YAt0A6f/6Ag39GwIk/yIBGQAJAPf/5gHd/9oB4wDx/wICFPwfBST8HgISAAH97wXj/NsC3wDp/vgDCv8Y/yACIf0YAgoB+v3pA+D83QTk/fADAf0QAhz+IAMd/REEA/ryCOb33wnh+OkG+PwHAxb+HQEfABgAC//7Ae0A4/7gA+X+7wH//w0CGfwdBRv8EQQE/PQD6f7iAeMB6/32Awb+EgEbABwAF/8KAv3/7wDnAOMA5/7wBv75CgUW/RoAGQMR/gQA9wHs/+QB5f/rAff/AwEQABj+GQIV/goD//3xAun+5QHpAfH+/AIJ/hIBGAAXABAABQD5AO//5wLo/uwC9/0BBA78FAQX/BMCCwAA//QD7P3nAer/8QL8/QYEEfwVBUb8SQI9/xQA3wG6AK7+twPV/foEIvxBA1D8SQYy+w0E5v3DAbIAsQDEAOYADf8wAkj8TQU//CEC/P/VArv7sAi599MJ9/gdBjz8SwNI/TEEEPvqBMn9tQK0AMX+4gMK/SwCRABK/j4EJP3+AdsBwP60A7z90QL1ABn+NgRI/EUCMwAUAO//zQO6/LUExfzhBAb9JgI//0cAPQEl/QIF4PnEB7n7vAPSAPL7FAgz90IKRPkyAhb/8gLT/r4CugDG/t8CAv8h/zkCRP47AiX/Bf/jAMoCvPu+CdL17goR+CwFPv4/ATIAF/72BNj6wga9/McD3/z9BB7/Nf0/Bjr5JQMJA+n5zgjB+cAE0v7sAg39KAQ6/DwEMvwYA/v/3f/IAsH+yAHeAvz7GAUw/DoDOP4mAgv+7QLU/cQExP3RAusACP0iBDb8OQUw+xkE/v3hAc3/xATK+t0G+PsUBCv+NgE1/yUADQHx/tgDyf7GANQA6f8EAR4BMP41AS7/GgIB/uYC0gDJBs0E3f71+Q/zJuwy8zHzJQQQCvUh3h/OKssV1A3o7gHkGdQr0jLdLPYbDwMv6zjXSM0z0CLd/vLfC8Ehui69L9sk/RAs+UfiY9NWzzzXE+ft/rIVrSakLcIp4hseBlLucNt20WbSLd8A8sMInRyTKZor0iL8EUf7eOaS137SWtgo59b8phGFIY0pmCfaGikHafKT4JjWgtVD4ADxuwWQGHAlkCizIQUSR/6S6rLclNaB2jTnyvqZDV0eYiaRJOcZNAhz9qjkytmP2Vnh/vCoA2sVZiBqJaAfBBJbAKDuweC+2obdP+jh+HoLVhpXInYi4BhDCY740+fX3bTca+ID8LMAcBFAHW4hsRwBEnUBv/Dt48bemN8x6s/3jAhdFlceix7QFy0KqvnQ69zipd+K5Pjwr/9KDlEZTR6jGgURVgO88+Pn6uCN4izr1fdtBkMTPxtuHNAVMAqU/Mnu9OTN4mHnA/Gb/mILNhZgGp0Y+g9xA8v1FOvM5KjlNOzK95QDWBBeF44YyhQ3Cqr94fHn6OLkdOgB8sL8VQlOE1IYhxYBD3cEtfjw7fTntuc97QL3gAJMDT4Viha8EkIKvv788gPrwOiB6v/xwvx5Bz8QeRS9EwQOgwTK+Q3wEOrK6Uju/PZ5AS8MMhJyFL4RQQmT/871Ie3S6pXs+vK9+2kGcw5tErcR/wyVBN364vLf7JbsTfD99rgAYwlsD2MSAQ9PCZgA7fbo7+7sm+0B9LD7YgVhDF4QsBABDE4F+fvv8/nupO5Q8QT4qf9bCFkOrA8ADlgIowAD+P/xAO+u7/70q/tPBFcKTA6uDv0KWASx/An1DPGy71ry//el/08HRwypDfwLXwe0ALz5E/O48L7w+vWo+54CRgmiDJ8NAwpcBMH9v/e/8sTxW/MF+Zr/owWdCp8M/wphB8cAx/rI9cTyafP59gX8nAKWB6EKlQsBCWkEyP3T+Mz0zfJr9Pz4mv6aBJIInAv8CW4G0ADX+9L22fNp9AL3/fuWAZQGkwkBCv4HcQPW/eP40/Xm82j1BvqK/pcDiQeWCf0IcQVzAd376/fc9Hv1c/cG/IoBhwV+CO4I8QZpA+z+9vkJ95f1nfYZ+gj+ewNqBl8I0wdSBW8BAPwe+S32v/au+B/8iABhBEoHtwe+BlcDef8h+0X42/bY9zX7GP5sAjkGqgajBkEEYwEc/VP5bvf39+X4Mf37/0YEGQaUBpoFUwKB/0v7gvgT+AP5XPsj/lYCHQWHBY4FGwRkAav9evoZ+SD5CfpE/f//MwOPBHMFjAQ/Ao//z/wg+jr5H/qF+y7+zwGVA2EFXwUhA28Ay/31+0D6Ufkk+1b9/v+rAmIEcgRfBDsCjP/z/C37VPpT+oP8Qf7eAH0DVQRYBAoDcgDa/SP8Z/pu+kj7b/38/7sBZgNLBGUDTwGV/w/9WfuD+mH7mPwx/84AkAJWA2ADHAJzAMX+R/xt+3f7Q/yJ/fv/qgFPA0wDUANFAZ//+v1X/Ib7iPuQ/Sv/1ABuAkIDPwMSAnEA1P43/Wv8m/tt/Gb+/f+fAWECNQNiAkABo/8W/nL8u/ty/Kv9MP/PAI8BWwJbAjsBcQDj/lT9iPyX/Ij8eP7+/8YAUgJQAlACMwGy/yL+ZP2f/J/8uf07/wQAgAFKAkACOAFvAPL+b/2v/LL8dv17/gcAuQCBATsCeQFzALb/Of6B/b78yfzG/Uv/+/96AS4CMgIqAXQA/f5H/oz91fyP/ZD+AAC5AG0BbwFtAXUAuf9R/pj9oP2Z/Zn+Sv8AALYAYwFtAR8Bxf8I/1r+r/2i/bb9lP4FALAAXwFkAVwBdQDA/xb/tv23/br9pv5O/wcApABiAVIBeADB/x//bf7F/cv9xP2t/gMAowBZAU4BUwFzAMn/IP9//tD92v2v/lz///+kAFABRgF2AMr/K/+B/oz+3v2K/rr+//+jAKIARAGhAHMA0P8w/5D+kv6R/sH+YP8AAKAAngCgAG0A2/8v/6L+l/6e/pn+av/6/wUAmACcAJsAcwDU/0P/n/6t/qL+0/5l/wEAlwCYAJcAcwDb/0b/rf60/qz+uf5l/wQA/f+VAJcAjgDk/9n/Uv+3/r7+uf7h/mv/BACMAJUAjAB1AOD/Vv9R/8j+xP7J/nT/bv8FAIcAkgCLAOX/5v9a/9H+0P7T/nP/dv8DAPz/jQCHAHAA7v9d/2X/2v7a/t7+ev95////iQCAAIsA6v/t/2v/Zv/o/uX+f/97/wAAAACCAIQA7f/0/2v/dP/v/vD+9P59/4T//f8CAH4AfQD3//H/ef92//z++/6G/4D/BQD6/4AAegDz////df+G/3r/Cf9//4f/iP///wAAegD9//3//P+A/43/f/+L/4v/iv8BAP///v8DAP3//v+P/4b/lf+G/5P/jf+O/wIA//8BAP3/BAD8/5b/jP+U/5H/kf+U////AAD//wIA/v8DAJH/lv+S/5r/kf+Z/5L/AwD9/wQA/f8CAP7/mv+W/5v/l/+Z/5n/AAABAP//AgD9/wIAmv+c/5z/nf+Z/6L/lv8HAPv/AwD/////AgCd/6L/nf+g/6L/nf8DAP7/AgD+/wIA/v+j/6T/oP+m/6L/pf+h/wQA+/8GAPv/AgD//6f/pf+o/6b/p/+n/wAA//8DAP3/AgD+/6r/rP+m/67/p/+u/6r///8CAP7/AQABAP7/rv+u/6z/sP+t/63/AwD9/wQA/P8CAP//sf+x/7H/sP+y/7L/s////wEA/v8DAP7/AQC0/7T/tf+2/7T/tf8BAP//AQAAAP//AAC4/7j/uP+4/7r/tv+9//7/AAACAP3/AgAAALv/vP+7/7v/v/+6/wMA/f8CAP//AAABAL3/wP+//77/w/+7/8b/+v8FAP3/AgD//wAAw//A/8f/v//I/7//AwD+/wEAAQD+/wIAw//J/8T/yf/D/8v/xP8DAP///v8DAP3/AgDJ/8n/yv/L/8n/zv/7/wYA+v8GAPr/BgDH/9L/yf/Q/83/z//O////AQD//wIA/v8BAND/0P/T/8//0//S//7/AwD8/wYA+f8HAMz/3P/N/9z/z//a/9D/BgD7/wQA/v8AAAEA1//X/9r/1v/b/9f/AgD+/wEAAAAAAAAA2//b/9z/2//d/9v/3v///wEA//8BAP//AQDd/+H/3f/h/9//4P8AAAAAAAAAAAAAAADi/+H/5f/g/+f/3v/o/////v8EAPz/AgAAAOX/5//l/+j/5P/s//r/BQD9/wIA//8BAOj/6v/q/+j/7v/m/+///f8CAP3/BAD8/wQA6v/u/+z/8f/p//P//P8DAP7/AgD9/wQA6//3/+r/9f/x//D/9P/+/wEAAAAAAAAA///2//H/+f/u//v/8f8DAP7/AQD9/wUA/P/6//X/+P/6//b/+//4//7/BAD7/wQA/v8BAPz/+f/9//r//f/+//z/BgD6/wQA/f8BAAAA/P8BAP3/AgD9/wMA`,
};
const sounds = {
    click: new Audio("data:audio/mpeg;base64," + encoded_sounds.click),
    msg: new Audio("data:audio/mpeg;base64," + encoded_sounds.msg),
    bigMsg: new Audio("data:audio/mpeg;base64," + encoded_sounds.bigMsg),
};

const reloadRates = {
	0: 'Disabled',
	6250: '6.25 seconds',
	10000: '10 seconds',
	20000: '20 seconds',
	30000: '30 seconds',
	60000: 'minute',
	180000: '3 minutes',
	300000: '5 minutes',
};

const seenComments = [];
let lastSeenNumComments = -1;
const playedSounds = [];
let watchedBoss = null;
let refreshIntervalId = -1;
let refreshIntervalMs = -1;
let state = 'idle';
let userHasInteracted = false;

function isValidBossId(bossId) {
    if (bossId == null) return false;
    return bossId.length < 9 && bossId.match('^[a-z0-9]+$');
}

function updateState(newState) {
    const statusBarDiv = $$(document).find('#statusBar');
    if (newState === 'watching') {
        statusBarDiv.className = '';
        statusBarDiv.classList.add('watching');
        $$(document).find('#status').innerHTML = `&#x1F504; Refreshing every ${refreshIntervalMs / 1000} s`;
        $$(document).find('#idInputHint').classList.add('hidden');
        $$(document).find('#disableWatching').classList.value = '';
        $$(document).find('#postId').disabled = true;
        $$(document).find('#submitButton').disabled = true;
        $$(document).find('#reloadRate').value = refreshIntervalMs;
    } else if (newState === 'idle') {
        statusBarDiv.className = '';
        statusBarDiv.classList.add('idle');
        $$(document).find('#status').innerHTML = '&#x1F4A4; Idle';
        $$(document).find('#disableWatching').classList.value = 'hidden';
        $$(document).find('#postId').disabled = false;
        $$(document).find('#submitButton').disabled = false;
        $$(document).find('#reloadRate').value = 0;
        const reloadSpinnerIdle = $$(document).find('#reloadSpinnerIdle');
        reloadSpinnerIdle.classList.value = 'hidden';
    } else {
        return;
    }

    state = newState;
}

function refreshPeriodically(postId, intervalMs) {
    updateState('watching');
    refreshIntervalId = setInterval(function () {
        loadBoss(postId);
    }, intervalMs);   
}

function startWatchingPost() {
    stopWatchingPost();
    const postIdInput = $$(document).find('#postId');
    let postId = '';
    if (isValidBossId(postIdInput.value)) {
        postId = postIdInput.value;
    } else {
        postId = $$(document).find('#postId').value.toLowerCase().replace(
            /.*?\/r\/kickopenthedoor\/comments\/(.*?)(?:$|\/.*)/,
            "$1"
        );
        postIdInput.value = postId;
    }
    if (!postId || postId.includes("/") || postId.length > 8) return;
    if (watchedBoss && watchedBoss !== postId) {
        const lastCommentsDiv = $$(document).find('#lastComments');
        lastCommentsDiv.innerHTML = "";
    }
    watchedBoss = postId;
    loadBoss(watchedBoss);
    const hiddenDivs = $$(document).findAll('.mainContent > .hidden, .tile.hidden');
    for (const hiddenDiv of hiddenDivs) {
        hiddenDiv.classList.remove('hidden');
    }
    if (refreshIntervalMs >= 500) {
        refreshPeriodically(postId, refreshIntervalMs);
    }
    if (!postIdInput.disabled) {
        temporarilyDisableInput(postIdInput);
    }
    const submitButton = $$(document).find('#submitButton');
    if (!submitButton.disabled) {
        temporarilyDisableInput(submitButton);
    }
}

function stopWatchingPost() {
    if (refreshIntervalId > 0) {
        clearInterval(refreshIntervalId);
    }
    updateState('idle');
}

function updateArticleInfo(articleData) {
    const postTitle = `<a href="https://www.reddit.com${
        articleData.permalink
    }">${
        articleData.title
    }</a>`;
    const postFlair = `<span style="background-color:${
        articleData.link_flair_background_color
    }; color: ${
        articleData.link_flair_text_color === "light" ? "white" : "black"
    }">${
        articleData.link_flair_text
    }</span>`;
    const postTitleSpan = $$(document).find('#postTitle');
    if (postTitleSpan.innerHTML !== postTitle) {
        postTitleSpan.innerHTML = postTitle;
    }
    const postFlairDiv = $$(document).find('#postFlair');
    if (postFlairDiv.innerHTML !== postFlair) {
        postFlairDiv.innerHTML = postFlair;
    }

    if (lastSeenNumComments < 0) {
        lastSeenNumComments = articleData.num_comments;
    }
    const numCommentsDiv = $$(document).find('#numComments');
    numCommentsDiv.innerHTML = `${articleData.num_comments}`;
    const commentDeltaSpan = document.createElement('span');
    commentDeltaSpan.classList.add('commentDelta');
    commentDeltaSpan.classList.add('tween');
    const commentDeltaHistory = $$(document).find('#commentDeltaHistory');
    const commentDelta = articleData.num_comments - lastSeenNumComments;
    commentDeltaSpan.textContent = commentDelta > 0 ? commentDelta : ".";
    if (commentDelta > 0) {
        commentDeltaSpan.classList.add('nonzero');
        commentDeltaSpan.classList.add('badge');
        commentDeltaSpan.classList.add('high');
        playedSounds.length = 0;
        if (commentDelta > 1) {
            playedSounds.push(sounds.bigMsg);
        } else {
            playedSounds.push(sounds.msg);
        }
    }
    
    const deltaSpans = $$(document).findAll('#commentDeltaHistory > span');
    if (deltaSpans.length < 20) {
        for (let i = 0; i < 19; i++) {
            const commentDeltaSpan = document.createElement('span');
            commentDeltaSpan.classList.add('commentDelta');
            commentDeltaSpan.classList.add('tween');
            commentDeltaSpan.classList.add('seen');
            commentDeltaSpan.textContent = ".";

            commentDeltaHistory.prepend(commentDeltaSpan);
        }
    }
    if (deltaSpans.length > 20) {
        $$(document).find('#commentDeltaHistory > span:last-child').remove();
    }
    const firstDelta = $$(document).find('#commentDeltaHistory > span:first-child');
    if (firstDelta) {
        firstDelta.classList.add('seen');
    }
    commentDeltaHistory.prepend(commentDeltaSpan);
    lastSeenNumComments = articleData.num_comments;
}

function updateComments(comments) {
    if (comments.kind === "more") return;
    const lastCommentsDiv = $$(document).find('#lastComments');
    for (const comment of comments.reverse()) {
        // Hide the pinned comment
        if (comment.data.distinguished === 'moderator') continue;
        processComment(comment, lastCommentsDiv);
    }
}

function processComment(comment, parentDiv) {
    if (comment.kind === "more") return;
    if (seenComments.includes(comment.data.id)) {
        processReplies($$(document).find(`#${comment.data.id}`), comment.data.replies);
        return;
    }

    const commentDiv = document.createElement('div');
    buildComment(commentDiv, comment.data);
    processReplies(commentDiv, comment.data.replies);
    parentDiv.prepend(commentDiv);
    if (playedSounds.length <= 0) {
        playedSounds.push(sounds.click);
    }

    seenComments.push(comment.data.id);
}

function buildComment(commentDiv, commentData) {
    commentDiv.classList.add('comment');
    commentDiv.classList.add('tween');
    commentDiv.id = commentData.id;
    commentDiv.innerHTML = `<span class="author">${
        commentData.author
    }</span>${
        buildFlair(commentData)
    }<div class="content">${
        commentData.body_html
            .replace(/&apos;/g, "'")
            .replace(/&quot;/g, '"')
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
    }</div>`;
}

function buildFlair(commentData) {
    if (commentData.author_flair_richtext && commentData.author_flair_richtext[1]) {
        return `<div class="authorFlair" style="background-color:${
                    commentData.author_flair_background_color
                }"><img class="authorFlairEmoji" alt="${
                    commentData.author_flair_richtext[0].a
                }" src="${
                    commentData.author_flair_richtext[0].u
                }">${
                    commentData.author_flair_richtext[1].t
                }</div>`;
    } else if (commentData.author_flair_text) {
        return `<div class="authorFlair" style="background-color:${
                    commentData.author_flair_background_color
                }">${
                    commentData.author_flair_text
                }</div>`;
    } else return '';
}

function processReplies(commentDiv, replies) {
    if (!replies || !commentDiv) return;
    const repliesDiv = document.createElement('div');
    repliesDiv.classList.add('replies');
    commentDiv.appendChild(repliesDiv);
    for (const reply of replies.data.children) {
        processComment(reply, repliesDiv);
    }
}

function playSound() {
    if (!userHasInteracted) return;
    for (const sound of playedSounds) {
        sound.play();
    }

    playedSounds.length = 0; // clear played sounds
}

function updatePage(jsonResponse) {
    const boss = JSON.parse(jsonResponse);
	setInitialLastUpdatedString();
    // $$(document).find('#lastUpdated').innerHTML =
    //         `${updateTimestamp.toLocaleTimeString()}.${
    //         Math.round(updateTimestamp.getMilliseconds() / 100)}`;
    updateArticleInfo(boss[0].data.children[0].data);
    updateComments(boss[1].data.children);
    setTimeout(() => {
        for (const comment of $$(document).findAll('.comment')) {
            if (comment.classList.contains('seen')) continue;
            comment.classList.add('seen');
        }
    }, 1);
    if (boss[0].data.children[0].data.link_flair_text.includes('/u/')) {
        stopWatchingPost();
    }
	const reloadSpinner = $$(document).find('#reloadSpinner');
	reloadSpinner.classList.value = 'hidden';
    if (state === 'watching') {
        const reloadSpinnerIdle = $$(document).find('#reloadSpinnerIdle');
        reloadSpinnerIdle.classList.value = 'spinner idle';
    }
    playSound();
}

function loadBoss(postId) {
	const reloadSpinner = $$(document).find('#reloadSpinner');
	reloadSpinner.classList.value = 'spinner';
	const reloadSpinnerIdle = $$(document).find('#reloadSpinnerIdle');
	reloadSpinnerIdle.classList.value = 'hidden';
    const ajaxUrl = `https://www.reddit.com/r/kickopenthedoor/comments/${
        postId
    }.json?limit=30&_=${
        new Date().getTime()
    }`;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            updatePage(this.responseText);
        }
    };
    xhttp.open("GET", ajaxUrl, true);
    xhttp.send();
}

function temporarilyDisableInput(input) {
    input.disabled = true;
    setTimeout((e) => {
        input.disabled = false;
    }, 1000);
}

function updateClock() {
    const now = new Date();
    const clockSpan = $$(document).find('#clock');
    clockSpan.innerHTML = `${now.toLocaleTimeString()}`;

	updateLastUpdatedString();

    const nowMillis = now.getMilliseconds();
    let timeout = 1000;
    if (nowMillis > 100) timeout = (1000 + nowMillis) / 2;
    setTimeout(updateClock, timeout);
}

function onReloadRateChange(e) {
    userHasInteracted = true;
    temporarilyDisableInput(e.target);
    if (e.target.value <= 0) {
        stopWatchingPost();
        refreshIntervalMs = -1;
        return;
    }

    refreshIntervalMs = e.target.value;
    startWatchingPost();
}

function onFormSubmit(e) {
    if (e) e.preventDefault();
    userHasInteracted = true;
    startWatchingPost();
}

function onDisableButtonClick(e) {
    stopWatchingPost();    
}

function onHideHeaderClick(e) {
    $$(document).find('#hideHeader').classList.add('hidden');
    $$(document).find('#showHeader').classList.remove('hidden');
    $$(document).find('#hideableHeader').classList.add('hidden');
}

function onShowHeaderClick(e) {
    $$(document).find('#hideHeader').classList.remove('hidden');
    $$(document).find('#showHeader').classList.add('hidden');
    $$(document).find('#hideableHeader').classList.remove('hidden');
}

window.addEventListener("load", function(e) {
    $$(document).find('#inputForm').addEventListener('submit', onFormSubmit);
    $$(document).find('#disableWatching').addEventListener('click', onDisableButtonClick);
    const hideHeaderLink = $$(document).find('#hideHeader');
    hideHeaderLink.classList.remove('hidden');
    hideHeaderLink.addEventListener('click', onHideHeaderClick);
    $$(document).find('#showHeader').addEventListener('click', onShowHeaderClick);
    updateClock();
    const postIdInput = $$(document).find('#postId');
    postIdInput.focus();
    const myUrl = new URL(window.location.toLocaleString());
    const urlParams = myUrl.searchParams;
    const bossId = urlParams.get('id');
    if (isValidBossId(bossId)) {
        postIdInput.value = `https://www.reddit.com/r/kickopenthedoor/comments/${
            bossId
        }`;
        startWatchingPost();
    }
    const reloadRatesDiv = $$(document).find('#reloadRate');
	reloadRatesDiv.innerHTML = getReloadRatesHTML(reloadRates);
	reloadRatesDiv.addEventListener("change", onReloadRateChange);
});
