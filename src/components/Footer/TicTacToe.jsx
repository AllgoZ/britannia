import { useState, useRef } from 'react'

const snackImg = { croissant: 'e27aa9ea.webp', cookie: '5753f7e6.webp', heart: '96d7a72d.webp' }
const LINES = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]

function getWinner(cells) {
  for (const l of LINES) {
    if (cells[l[0]] && cells[l[0]] === cells[l[1]] && cells[l[1]] === cells[l[2]]) return l
  }
  return null
}

export default function TicTacToe() {
  const [cells, setCells] = useState(Array(9).fill(null))
  const [me, setMe] = useState(null)
  const [ai, setAi] = useState(null)
  const [over, setOver] = useState(false)
  const [status, setStatus] = useState('')
  const [hintHidden, setHintHidden] = useState(false)
  const [busy, setBusy] = useState(false)
  const ghost = useRef(null)
  const dragSnack = useRef(null)
  const boardRef = useRef(null)

  const reset = () => {
    setCells(Array(9).fill(null))
    setMe(null)
    setAi(null)
    setOver(false)
    setStatus('')
    setHintHidden(false)
    setBusy(false)
  }

  const checkWinner = (c, myToken, aiToken) => {
    const w = getWinner(c)
    if (w) {
      setOver(true)
      setStatus(c[w[0]] === myToken ? 'You win! Sweet victory 🎉' : 'The snack bot wins this round!')
      return true
    }
    if (c.every(Boolean)) { setOver(true); setStatus("It's a draw — snacks for everyone!"); return true }
    return false
  }

  const doAiMove = (c, myToken, aiToken) => {
    const free = c.map((v, i) => v ? null : i).filter(v => v !== null)
    const tryWin = (who) => free.find(i => { const b = [...c]; b[i] = who; return getWinner(b) })
    let m = tryWin(aiToken)
    if (m === undefined) m = tryWin(myToken)
    if (m === undefined) m = !c[4] ? 4 : undefined
    if (m === undefined) {
      const corners = [0, 2, 6, 8].filter(i => !c[i])
      m = Math.random() < 0.7 && corners.length ? corners[Math.floor(Math.random() * corners.length)] : free[Math.floor(Math.random() * free.length)]
    }
    const next = [...c]; next[m] = aiToken
    setCells(next)
    if (!checkWinner(next, myToken, aiToken)) setStatus('Your turn')
    setBusy(false)
  }

  const place = (i, myToken, aiToken, currentCells) => {
    if (over || busy || currentCells[i] || !myToken) return
    const next = [...currentCells]; next[i] = myToken
    setCells(next)
    if (checkWinner(next, myToken, aiToken)) return
    setBusy(true)
    setStatus('Snack bot is thinking…')
    setTimeout(() => doAiMove(next, myToken, aiToken), 550)
  }

  const chooseSnack = (s, currentMe) => {
    if (currentMe) return s
    const others = Object.keys(snackImg).filter(k => k !== s)
    const newAi = others[Math.floor(Math.random() * 2)]
    setMe(s)
    setAi(newAi)
    setHintHidden(true)
    setStatus('Your turn — place your snack on the board')
    return [s, newAi]
  }

  const winner = getWinner(cells)

  const onSnackPointerDown = (e, s) => {
    if (over || (me && s !== me)) return
    dragSnack.current = s
    const el = document.createElement('img')
    el.className = 'drag-ghost'
    el.src = `assets/img/${snackImg[s]}`
    el.style.left = e.clientX + 'px'
    el.style.top = e.clientY + 'px'
    document.body.appendChild(el)
    ghost.current = el
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const onSnackPointerMove = (e) => {
    if (!ghost.current) return
    ghost.current.style.left = e.clientX + 'px'
    ghost.current.style.top = e.clientY + 'px'
    const cell = document.elementFromPoint(e.clientX, e.clientY)?.closest('.cell')
    boardRef.current?.querySelectorAll('.cell').forEach(c => c.classList.toggle('hint', c === cell && !cells[+c.dataset.i]))
  }
  const onSnackPointerUp = (e, s) => {
    if (!ghost.current) return
    ghost.current.remove(); ghost.current = null
    boardRef.current?.querySelectorAll('.cell').forEach(c => c.classList.remove('hint'))
    const cell = document.elementFromPoint(e.clientX, e.clientY)?.closest('.cell')
    let myToken = me, aiToken = ai, currentCells = cells
    if (!me) {
      const result = chooseSnack(s, me)
      if (Array.isArray(result)) { myToken = result[0]; aiToken = result[1] }
    }
    if (cell && myToken === s && !over && !currentCells[+cell.dataset.i]) {
      place(+cell.dataset.i, myToken, aiToken, currentCells)
    }
    dragSnack.current = null
  }
  const onSnackPointerCancel = () => {
    ghost.current?.remove(); ghost.current = null; dragSnack.current = null
  }

  return (
    <div className="ttt reveal" id="ttt">
      <h3>TIC TAC TOE</h3>
      <div className="board" ref={boardRef}>
        {cells.map((v, i) => (
          <div
            key={i}
            className={`cell${winner && winner.includes(i) ? ' win' : ''}`}
            data-i={i}
            onClick={() => { if (me) place(i, me, ai, cells); else setStatus('Pick a snack first!') }}
          >
            {v && <img src={`assets/img/${snackImg[v]}`} alt={v} />}
          </div>
        ))}
      </div>
      <div className={`hint-text${hintHidden ? ' hide' : ''}`}>
        <img className="ghost" src="assets/img/e27aa9ea.webp" alt="" />
        <svg width="24" height="70" viewBox="0 0 24 70" fill="none" stroke="#EC1C24" strokeWidth="1.4" strokeDasharray="3 4"><path d="M18 68C4 50 4 22 12 4"/><path d="m7 9 5-6 4 7" strokeDasharray="0"/></svg>
        <span>Drag your favourite<br />snack to start the game</span>
      </div>
      <div className="snacks">
        {Object.entries(snackImg).map(([s, h]) => (
          <button
            key={s}
            className={`snack${me === s ? ' sel' : ''}${ai === s ? ' used' : ''}`}
            data-s={s}
            aria-label={s}
            onPointerDown={(e) => onSnackPointerDown(e, s)}
            onPointerMove={onSnackPointerMove}
            onPointerUp={(e) => onSnackPointerUp(e, s)}
            onPointerCancel={onSnackPointerCancel}
          >
            <img src={`assets/img/${h}`} alt="" />
          </button>
        ))}
      </div>
      <p className="ttt-status" role="status">{status}</p>
      {over && <button className="ttt-reset" onClick={reset}>Play again</button>}
    </div>
  )
}
