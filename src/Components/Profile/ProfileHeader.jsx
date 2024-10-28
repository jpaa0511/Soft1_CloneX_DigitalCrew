import styled from 'styled-components'

const Header = styled.header`
  .top {
    display: flex;
    align-items: center;
    padding: 15px;
    color: white;
    width: 100%;
    backdrop-filter: blur(2px);
    background-color: rgba(0, 0, 0, 0.5);

    .info {
      margin-left: 30px;

      h1 {
        font-size: 20px;
      }

      &__tweets-count {
        font-size: 14px;
        margin-top: 2px;
        color: #888;
      }
    }
  }

  .cover {
    width: 100%;
    background-color: #555;
    height: 200px;
    overflow: hidden;

    img {
      width: 100%;
      object-fit: cover;
      object-position: center;
    }
  }
`

export default function ProfileHeader() {

  return (
    <Header>
      <div className="top">
        <button>
          
        </button>
        <div className="info">
          <h1></h1>
          <span className="info__tweets-count"> Tweets</span>
        </div>
      </div>
      <div className="cover">
        <img src="https://picsum.photos/500/300" />
      </div>
    </Header>
  )
}
