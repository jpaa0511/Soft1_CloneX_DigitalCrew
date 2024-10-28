import styled from 'styled-components'

const Container = styled.div`
  padding: 20px;
  position: relative;

  .top {
    display: flex;
    justify-content: space-between;
    margin-top: calc(var(--profile-image-size) / -2);

    .image {
      width: var(--profile-image-size);
      height: var(--profile-image-size);
      border-radius: 50%;
      overflow: hidden;
      border: 4px solid black;
      background-color: #444;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .actions {
      position: relative;
      top: 55px;
      display: flex;

      .action-btn {
        border: 1px solid #777;
        margin-right: 10px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  .details {
    color: #888;
    margin-top: 20px;

    .user {
      &__name {
        color: white;
        font-weight: bold;
      }

      &__id {
        margin-top: 2px;
        font-size: 15px;
      }

      &__bio {
        color: white;
        margin-top: 10px;
        a {
          color: var(--theme-color);
          text-decoration: none;
        }
      }

      &__joined {
        display: flex;
        align-items: center;
        margin-top: 15px;
        font-size: 15px;

        &--text {
          margin-left: 5px;
        }
      }

      &__follows {
        font-size: 15px;
        display: flex;
        margin-top: 15px;

        b {
          color: white;
        }

        &__followers {
          margin-left: 20px;
        }
      }

      &__followed-by {
        font-size: 13px;
        margin-top: 15px;
      }
    }
  }
`

export default function ProfileBio() {

  return (
    <Container>
      <div className="top">
        <div className="image">
          {' '}
          <img src="" alt="" />
        </div>
        
          <div className="actions">
            
              <button className="action-btn">
                
              </button>
            
            
          </div>
       
      </div>
      <div className="details">
        <span className="user__name"></span>
        <span className="user__id"></span>
        <span className="user__bio"  />
        <div className="user__joined">
          
          <span className="user__joined--text">Joined</span>
        </div>
        <div className="user__follows">
          <span className="user__follows__following">
            <b>10</b> Following
          </span>
          <span className="user__follows__followers">
            <b>10</b> Followers
          </span>
        </div>
        <div className="user__followed-by">
          Not followed by anyone you are following
        </div>
      </div>
    </Container>
  )
}
