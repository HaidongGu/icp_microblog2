import List "mo:base/List";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
import Time "mo:base/Time";

actor {
  public func greet(name : Text) : async Text {
    return "Hello~, Good Evening! " # name # "!";
  };

  public type Message = {
    message : Text;
    time: Time.Time; // as suggested by https://forum.dfinity.org/t/how-to-convert-time-now-to-yyyy-mm-dd-in-motoko/10407, we don't parse Time value
    author : ?Text;
  };

   public type Follow = {
    pid: Principal;
    name: ?Text;
  }; 

  public type Microblog = actor {
    follow: shared (Principal) -> async ();
    follows: shared query() -> async [Follow];
    post: shared (Text, Text) -> async ();
    posts: shared query (Time.Time) -> async [Message];
    timeline : shared (Time.Time) -> async [Message];
    set_name : shared (Text, Text) -> async ();
    get_name : shared query () -> async ?Text;
  };

  stable var followed: List.List<Follow> = List.nil();
  stable var messages: List.List<Message> = List.nil();
    stable var name: ?Text = ?"Student #47" ;


  public shared func set_name(opt : Text, text: ?Text) {
      assert (opt == "11234");
      name := text;
   };
  public shared func get_name() : async ?Text {
      name;
   };

  public shared func follow (id: Principal): async () {

    let canister : Microblog = actor(Principal.toText(id));
    let n : ?Text = await canister.get_name();

    let follow: Follow = {
      pid = id;
      name = n;
    };
    followed := List.push(follow, followed);
  };

  public shared query func follows(): async [Follow] {
    List.toArray(followed);
  };

  public shared func post (otp: Text, text: Text): async() {
    assert(otp == "11234");
    let post: Message = {
        message = text;
        time = Time.now();
        author = name;
    };
    messages := List.push(post, messages);
  };

  public shared query func posts(since: Time.Time): async [Message] {
    var posts : List.List<Message> = List.nil();

    for (msg in Iter.fromList(messages)) {
      if (msg.time > since ) {
        posts := List.push(msg, posts);
      }
    };

    List.toArray(posts);
  };

  public shared func timeline(since: Time.Time): async [Message] {
    var all : List.List<Message> = List.nil();

    for (follow in Iter.fromList(followed)) {
      let canister : Microblog = actor(Principal.toText(follow.pid));
      let msgs : [Message] = await canister.posts(since);
      for (msg in Iter.fromArray(msgs)) {
        all := List.push(msg, all);
      };
    };

    List.toArray(all);
  }


};
