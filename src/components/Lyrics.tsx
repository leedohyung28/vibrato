import React from "react";
const lyrics = [
  {
    Lyrics: `Load up on guns, bring your friends
It's fun to lose and to pretend
She's over-bored and self-assured
Oh no, I know a dirty word
Hello, hello, hello, how low
Hello, hello, hello, how low
Hello, hello, hello, how low
Hello, hello, hello
With the lights out, it's less dangerous
Here we are now, entertain us
I feel stupid and contagious
Here we are now, entertain us
A mulatto, an albino
A mosquito, my libido
Yeah
Hey
Yay
I'm worse at what I do best
And for this gift I feel blessed
Our little group has always been
And always will until the end
Hello, hello, hello, how low
Hello, hello, hello, how low
Hello, hello, hello, how low
Hello, hello, hello
With the lights out, it's less dangerous
Here we are now, entertain us
I feel stupid and contagious
Here we are now, entertain us
A mulatto, an albino
A mosquito, my libido
Yeah
Hey
Yay
And I forget just why I taste
Oh yeah, I guess it makes me smile
I found it hard, it's hard to find
Ooh well, whatever, nevermind
Hello, hello, hello, how low
Hello, hello, hello, how low
Hello, hello, hello, how low
Hello, hello, hello
With the lights out, it's less dangerous
Here we are now, entertain us
I feel stupid and contagious
Here we are now, entertain us
A mulatto, an albino
A mosquito, my libido
A denial
A denial
A denial
A denial
A denial
A denial
A denial
A denial
A denial
`,
  },
];
const Lyrics: React.FC = () => {
  return (
    <section className="col-span-8">
      <div className="col-span-1">
        <h2 className="text-2xl font-bold">가사</h2>
        <div className="my-4 rounded-md border border-gray_border shadow-md">
          <p className="text-center p-4 whitespace-pre-line font-semibold text-gray_dark">
            {lyrics[0].Lyrics}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Lyrics;
